import { createSlice } from "@reduxjs/toolkit"
import { PayloadAction } from "@reduxjs/toolkit/dist/createAction"
import { UsuarioAuth } from "@/interfaces/UsuarioAuth"

interface AuthState {
  usuario: UsuarioAuth | null
  token: string | undefined
}

const INITIAL_STATE: AuthState = {
  usuario: null,
  token: ''
}

export const authSlice = createSlice({
  name: "auth",
  initialState: INITIAL_STATE,
  reducers: {
    setUsuarioAuth: (state, action: PayloadAction<UsuarioAuth>) => {
      state.usuario = action.payload
      state.token = action.payload.token
      localStorage.setItem('usuario', JSON.stringify(action.payload))
    },
    clearUsuarioAuth: (state) => {
      state.usuario = null
      state.token = ''
      localStorage.removeItem('usuario')
    }
  }
});

export const { setUsuarioAuth, clearUsuarioAuth } = authSlice.actions;
export default authSlice.reducer;

export const setUsuarioAuthFromLocalStorage = () => (dispatch: any) => {
  const usuario = localStorage.getItem('usuario')
  if (usuario) {
    dispatch(setUsuarioAuth(JSON.parse(usuario)))
  }
}