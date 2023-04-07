import { createSlice } from "@reduxjs/toolkit"
import { PayloadAction } from "@reduxjs/toolkit/dist/createAction"

interface AuthState {
  token: string | null
}

const INITIAL_STATE: AuthState = {
  token: null
}

export const authSlice = createSlice({
  name: "auth",
  initialState: INITIAL_STATE,
  reducers: {
    setToken(state, action: PayloadAction<string | null>) {
      state.token = action.payload;
    }
  }
});

export const { setToken } = authSlice.actions;
export default authSlice.reducer;