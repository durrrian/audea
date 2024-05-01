export const transactionTypeStyle = {
  buy: {
    background: '#5DE76F',
    color: '#1F365F',
  },
  sell: {
    background: '#DC2626',
    color: '#FEFFF7',
  },
}

export const renderTransactionType = (type: 'BUY' | 'SELL') => {
  if (type === 'BUY') return transactionTypeStyle.buy

  return transactionTypeStyle.sell
}

export const containerStart = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'start',
  width: '100%',
}

export const containerEnd = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'end',
  width: '100%',
}

export const centerContainer = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center' as const,
}

export const tableHeaderText = {
  color: '#74777F',
  fontSize: '16px',
  fontWeight: 400,
  textAlign: 'center' as const,
}

export const tableItemsText = {
  color: '#1F365F',
  fontSize: '16px',
  textAlign: 'center' as const,
}

export const cardStyle = {
  padding: '1rem',
  border: '1px solid #1F365F',
  borderRadius: '0.5rem',
}
