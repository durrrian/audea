'use client'

import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import type { Membership } from '@repo/prisma/client'
import { LoadingAnimation } from '@repo/web-ui/lib'
import { checkPaymentStatus } from '../action/check-payment-status'
import { BankTransferPending } from './bank-transfer-pending'
import { QRPending } from './qr-pending'
import { PendingPaymentGeneral } from './pending-payment-general'
import { PaymentNeedAuthorize } from './payment-need-authorize'
import { FailedPayment } from './failed-payment'

interface Prop {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- its okay
  transactionStatus: Record<string, any>
  membership: Membership | undefined | null
}

export function PaymentIncomplete({ transactionStatus, membership }: Prop) {
  const router = useRouter()

  const { data } = useQuery({
    queryKey: [transactionStatus.transaction_id],
    queryFn: async () => checkPaymentStatus(transactionStatus.order_id as string),
    refetchInterval: 1000,
    initialData: transactionStatus,
  })

  const orderId = transactionStatus.order_id as string

  const redirectUrl = membership
    ? '/settings/membership'
    : `/pay?tier=${String(transactionStatus.order_id).split('-')[3]}`

  const cancelUrl = `/payment-capture/cancel?order_id=${encodeURIComponent(
    orderId,
  )}&redirect_url=${encodeURIComponent(redirectUrl)}`

  const status = data.transaction_status

  if (status === 'capture' || status === 'settlement') {
    router.refresh()
  }

  if (status === 'pending') {
    if (data.payment_type === 'bank_transfer') {
      // 'bank-transfer-pending'
      return <BankTransferPending data={data} cancelUrl={cancelUrl} />
    }

    if (data.payment_type === 'qris') {
      // 'qr-pending'
      return <QRPending data={data} cancelUrl={cancelUrl} />
    }

    // 'pending-payment-general'
    return <PendingPaymentGeneral data={data} cancelUrl={cancelUrl} />
  }

  if (status === 'authorize') {
    // 'payment-need-authorize'
    return <PaymentNeedAuthorize cancelUrl={cancelUrl} />
  }

  if (status === 'deny' || status === 'cancel' || status === 'expire' || status === 'failure') {
    // 'failed-payment'
    return <FailedPayment data={data} cancelUrl={cancelUrl} />
  }

  return <LoadingAnimation />
}
