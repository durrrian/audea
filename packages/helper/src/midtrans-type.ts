export interface MidtransTransactionStatus {
  transaction_time: string
  gross_amount: string
  currency: string
  order_id: string
  payment_type: string
  signature_key: string
  status_code: string
  transaction_id: string
  transaction_status: string
  fraud_status: string
  expiry_time: string
  status_message: string
  merchant_id: string
  acquirer?: string
  va_numbers?: { bank: string; va_number: string }[]
}

export type MembershipCaptureType = 'look-whos-back' | 'new-member' | 'perpanjang' | 'upgrading'

export type MidtransPaymentJourneyType =
  | 'bank-transfer-pending'
  | 'failed-payment'
  | 'payment-need-authorize'
  | 'pending-payment-general'
  | 'qr-pending'
