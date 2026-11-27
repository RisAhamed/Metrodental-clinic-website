import { apiHandler, webhookHandler } from '../../portal/server/http.js'

export default function handler(req, res) {
  if (req.url?.split('?')[0] === '/api/payments/razorpay/webhook') {
    return webhookHandler(req, res)
  }
  return apiHandler(req, res)
}
