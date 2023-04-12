import { configureStore } from '@reduxjs/toolkit'
import productSlice from './features/product/productSlice';
import designSlice from './features/design/designSlice';
import authSlice from './features/auth/authSlice';
import userSlice from './features/user/userSlice';

export const store = configureStore({
  reducer: {
    product: productSlice,
    design: designSlice,
    auth: authSlice,
    user: userSlice
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;