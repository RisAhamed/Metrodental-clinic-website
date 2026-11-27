import { clinic } from '../data/clinic'

let scriptPromise = null

function loadRazorpayScript() {
  if (window.Razorpay) return Promise.resolve(true)
  if (scriptPromise) return scriptPromise
  scriptPromise = new Promise((resolve) => {
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.async = true
    script.onload = () => resolve(true)
    script.onerror = () => {
      scriptPromise = null
      resolve(false)
    }
    document.body.appendChild(script)
  })
  return scriptPromise
}

export const PAYMENT_FAILED_MESSAGE =
  'Payment failed. You have not been charged. If any amount was debited from your UPI account, it will be automatically refunded by your bank.'

/**
 * Opens the Razorpay payment window.
 * The browser never decides that a payment worked: onSuccess receives the signed response,
 * which MUST be sent to our backend, where the signature is verified.
 *
 * Returns { rzp, close } so the caller can dismiss the QR modal (and stop its 10-minute
 * countdown) from a failure event or from order-status polling.
 */
export async function openRazorpay({ payment, user, description, onSuccess, onDismiss, onFailure }) {
  const loaded = await loadRazorpayScript()
  if (!loaded) {
    onFailure?.('Could not load the payment window. Check your connection and try again.')
    return null
  }
  // Set before close() so a programmatic close cannot be mistaken for the user
  // abandoning the modal and overwrite the real failure description.
  let paymentFailed = false
  const options = {
    key: payment.keyId,
    amount: payment.amount,
    currency: payment.currency,
    order_id: payment.razorpayOrderId,
    name: clinic.name,
    description,
    prefill: {
      name: user?.name,
      email: user?.email,
      contact: user?.phone,
    },
    theme: { color: '#17807b' },
    handler: (response) => onSuccess(response),
    modal: {
      ondismiss: () => {
        if (!paymentFailed) onDismiss?.()
      },
    },
  }
  const rzp = new window.Razorpay(options)
  const close = () => {
    try {
      rzp.close()
    } catch {
      /* already closed */
    }
  }

  // UPI QR failures otherwise leave the 10-minute timer modal hanging on screen.
  rzp.on('payment.failed', (response) => {
    paymentFailed = true
    close()
    onFailure?.(response?.error?.description || PAYMENT_FAILED_MESSAGE, response)
  })
  rzp.open()
  return { rzp, close }
}
