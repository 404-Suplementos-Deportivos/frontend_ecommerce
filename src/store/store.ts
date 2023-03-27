import { configureStore } from '@reduxjs/toolkit'
import productSlice from './features/product/productSlice';

export const store = configureStore({
  reducer: {
    product: productSlice
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;