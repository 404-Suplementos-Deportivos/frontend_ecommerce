export const formatDate = (date: string): string => {
  const newDate = new Date(date)

  const options = {
    year: 'numeric' as const,
    month: '2-digit' as const,
    day: '2-digit' as const,
  }

  const parts = newDate.toLocaleDateString('en-US', options).split('/')
  return `${parts[2]}-${parts[0].padStart(2, '0')}-${parts[1].padStart(2, '0')}`
}