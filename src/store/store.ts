import { configureStore } from '@reduxjs/toolkit'
import productsSlice from './features/product/productsSlice';
import cartSlice from './features/product/cartSlice';
import designSlice from './features/design/designSlice';
import authSlice from './features/auth/authSlice';
import userSlice from './features/user/userSlice';
import billingSlice from './features/billing/billingSlice';

export const store = configureStore({
  reducer: {
    productos: productsSlice,
    cart: cartSlice,
    design: designSlice,
    auth: authSlice,
    user: userSlice,
    billing: billingSlice
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;