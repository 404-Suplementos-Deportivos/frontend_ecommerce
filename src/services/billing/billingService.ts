import axios from '@/libs/axios'
import { Comprobante } from '@/interfaces/Comprobante'

export const createComprobante = async (comprobante: Comprobante): Promise<Comprobante> => {
  const response = await axios.post('/ventas', comprobante)
  return response.data
}