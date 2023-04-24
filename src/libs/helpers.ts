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

const YEARMAX = new Date().getFullYear() // 2023
export const getYears = Array.from(new Array(20), (valor, index) => YEARMAX - index)
export const getMonths = Array.from(new Array(12), (valor, index) => index < 9 ? `0${index + 1}` : `${index + 1}`)