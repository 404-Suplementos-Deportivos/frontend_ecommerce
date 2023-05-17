import axios from '@/libs/axios'
import { Comprobante } from '@/interfaces/Comprobante'

export const getComprobantes = async (): Promise<any> => {
  const response = await axios.get('/ventas')
  return response.data
}

export const createComprobante = async (comprobante: Comprobante): Promise<Comprobante> => {
  const response = await axios.post('/ventas', comprobante)
  return response.data
}

export const saveComprobante = async (numOrden: string): Promise<any> => {
  const response = await axios.get(`/ventas/${numOrden}`)
  return response.data
}