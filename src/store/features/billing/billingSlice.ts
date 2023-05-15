import { createSlice } from "@reduxjs/toolkit"
import { PayloadAction } from "@reduxjs/toolkit/dist/createAction"
import { Comprobante } from "@/interfaces/Comprobante"
import { createComprobante } from "@/services/billing/billingService"
import { showToast } from "../design/designSlice"
import { cleanCart } from "../product/cartSlice"

type Error = 'success' | 'error' | 'warning' | 'info'

interface BillingState {
  comprobante: Comprobante,
  message: string,
  loading: boolean,
  error: {
    type: Error,
    message: string
  }
}

const INITIAL_STATE: BillingState = {
  comprobante: {} as Comprobante,
  message: '',
  loading: false,
  error: {
    type: 'info',
    message: ''
  }
}

export const billingSlice = createSlice({
  name: 'billing',
  initialState: INITIAL_STATE,
  reducers: {
    getBillingStart: (state) => {
      state.loading = true
    },
    getBillingSuccess: (state, action: PayloadAction<Comprobante>) => {
      state.comprobante = action.payload
      state.loading = false
    },
    getBillingError: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = {
        type: 'error',
        message: action.payload
      }
    }
  }
})

export const { getBillingStart, getBillingSuccess, getBillingError } = billingSlice.actions
export default billingSlice.reducer

export const createComprobanteAsync = (comprobante: Comprobante) => async (dispatch: any) => {
  try {
    dispatch(getBillingStart())
    const response = await createComprobante(comprobante)
    dispatch(getBillingSuccess(response))
    dispatch(showToast({
      type: 'success',
      message: response.message as string
    }))
    dispatch(cleanCart())
  } catch (error: any) {
    dispatch(getBillingError(error.response.data.message))
    dispatch(showToast({
      type: 'error',
      message: error.response.data.message
    }))
  }
}