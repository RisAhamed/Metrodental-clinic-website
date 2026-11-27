import { useCallback, useEffect, useRef, useState } from 'react'
import api from '../lib/api'
import { openRazorpay, PAYMENT_FAILED_MESSAGE } from '../lib/razorpay'

const POLL_INTERVAL_MS = 4_000
const PAYMENT_WINDOW_MS = 10 * 60 * 1_000

/**
 * Owns the Razorpay modal plus the order-status polling that backs it up.
 *
 * Why polling: a UPI QR can fail (or succeed) without the browser ever receiving a
 * callback. Every 4s we ask the server for the real order status. On PAID we close the
 * modal and hand over to onPaid; on FAILED we close it and show the reason to the user.
 *
 * All timers and the modal are cleaned up on dismiss, failure, success, 10-minute
 * expiry and component unmount.
 */
export function usePaymentFlow({ user, onPaid, onDismissed } = {}) {
  const [paying, setPaying] = useState(false)
  const [failure, setFailure] = useState('')

  const rzpRef = useRef(null)
  const pollRef = useRef(null)
  const windowTimerRef = useRef(null)
  const generationRef = useRef(0)
  const terminalRef = useRef(false)
  const handlersRef = useRef({ onPaid, onDismissed })
  handlersRef.current = { onPaid, onDismissed }

  const clearTimers = useCallback(() => {
    if (pollRef.current) {
      clearInterval(pollRef.current)
      pollRef.current = null
    }
    if (windowTimerRef.current) {
      clearTimeout(windowTimerRef.current)
      windowTimerRef.current = null
    }
  }, [])

  const stop = useCallback(
    ({ close = true } = {}) => {
      generationRef.current += 1
      terminalRef.current = true
      clearTimers()
      if (close && rzpRef.current) {
        try {
          rzpRef.current.close()
        } catch {
          /* already closed */
        }
        rzpRef.current = null
      }
    },
    [clearTimers],
  )

  useEffect(
    () => () => {
      generationRef.current += 1
      clearTimers()
      if (rzpRef.current) {
        try {
          rzpRef.current.close()
        } catch {
          /* already closed */
        }
        rzpRef.current = null
      }
    },
    [clearTimers],
  )

  const fail = useCallback(
    (message) => {
      stop()
      setPaying(false)
      setFailure(String(message || PAYMENT_FAILED_MESSAGE))
    },
    [stop],
  )

  const startPolling = useCallback(
    (orderId) => {
      clearTimers()
      const generation = generationRef.current

      pollRef.current = setInterval(async () => {
        try {
          const { data: order } = await api.get(`/api/orders/${orderId}`)
          if (generation !== generationRef.current) return // a newer payment attempt started
          if (order.status === 'PAID') {
            stop()
            setPaying(false)
            handlersRef.current.onPaid?.(order, { fromPolling: true })
          } else if (order.status === 'FAILED') {
            fail(order.failureReason || PAYMENT_FAILED_MESSAGE)
          }
        } catch {
          // Network blips are temporary — keep polling until a terminal state or timeout.
        }
      }, POLL_INTERVAL_MS)

      windowTimerRef.current = setTimeout(() => {
        fail('The payment window has expired. Please retry the payment.')
      }, PAYMENT_WINDOW_MS)
    },
    [clearTimers, stop, fail],
  )

  /** Open a payment attempt for an existing order. Safe to call again (retry). */
  const startPayment = useCallback(
    async ({ orderId, payment, description }) => {
      stop()
      terminalRef.current = false
      const generation = generationRef.current
      setFailure('')
      setPaying(true)

      const handle = await openRazorpay({
        payment,
        user,
        description,
        onSuccess: (response) => {
          if (terminalRef.current) return
          stop()
          setPaying(false)
          handlersRef.current.onPaid?.(null, { response })
        },
        onDismiss: () => {
          if (terminalRef.current) return
          stop()
          setPaying(false)
          handlersRef.current.onDismissed?.()
        },
        onFailure: (message) => {
          if (!terminalRef.current) fail(message)
        },
      })

      // Script failed to load (onFailure already set the message), or the user left
      // while the script was loading: do not start polling.
      if (!handle || generation !== generationRef.current) {
        handle?.close()
        return
      }
      rzpRef.current = handle.rzp
      startPolling(orderId)
    },
    [stop, fail, startPolling, user],
  )

  return {
    paying,
    failure,
    startPayment,
    stopPayment: stop,
    clearFailure: () => setFailure(''),
    showFailure: (message) => {
      stop()
      setPaying(false)
      setFailure(String(message || PAYMENT_FAILED_MESSAGE))
    },
  }
}
