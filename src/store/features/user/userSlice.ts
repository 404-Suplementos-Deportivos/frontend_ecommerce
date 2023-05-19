import { createSlice } from "@reduxjs/toolkit"
import { PayloadAction } from "@reduxjs/toolkit/dist/createAction"
import { Usuario } from "@/interfaces/Usuario"
import { getUser } from "@/services/users/usersService"
import { updateUser, deleteUser, changePassword } from "@/services/users/usersService"
import { showToast } from "../design/designSlice"
import { clearUsuarioAuth } from "../auth/authSlice"

type Error = 'success' | 'error' | 'warning' | 'info'

interface UserState {
  usuario: Usuario | null
  loading: boolean;
  error: {
    type: Error;
    message: string;
  };
}

const INITIAL_STATE: UserState = {
  usuario: null,
  loading: false,
  error: {
    type: 'info',
    message: ''
  }
}

export const userSlice = createSlice({
  name: "user",
  initialState: INITIAL_STATE,
  reducers: {
    getUserStart: (state) => {
      state.loading = true
    },
    getUserSuccess: (state, action: PayloadAction<Usuario>) => {
      state.usuario = action.payload
      state.loading = false
    },
    getUserError: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = {
        type: 'error',
        message: action.payload
      }
    },
    updateUserStart: (state) => {
      state.loading = true
    },
    updateUserSuccess: (state, action: PayloadAction<Usuario>) => {
      state.usuario = action.payload
      state.loading = false
      state.error = {
        type: 'success',
        message: 'Usuario actualizado correctamente'
      }
    },
    updateUserError: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = {
        type: 'error',
        message: action.payload
      }
    },
    deleteUserStart: (state) => {
      state.loading = true
    },
    deleteUserSuccess: (state, action: PayloadAction<string>) => {
      state.usuario = null
      state.loading = false
      // state.error = {
      //   type: 'success',
      //   message: action.payload
      // }
    },
    deleteUserError: (state, action: PayloadAction<string>) => {
      state.loading = false
      // state.error = {
      //   type: 'error',
      //   message: action.payload
      // }
    },
    changePasswordStart: (state) => {
      state.loading = true
    },
    changePasswordSuccess: (state, action: PayloadAction<string>) => {
      state.loading = false
    },
    changePasswordError: (state, action: PayloadAction<string>) => {
      state.loading = false
    },
    clearUserError: (state) => {
      state.error = {
        type: 'info',
        message: ''
      }
    }
  },
})

export const {
  getUserStart,
  getUserSuccess,
  getUserError,
  updateUserStart,
  updateUserSuccess,
  updateUserError,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserError,
  changePasswordStart,
  changePasswordSuccess,
  changePasswordError,
  clearUserError
} = userSlice.actions
export default userSlice.reducer

export const getUserAsync = (id: string) => async (dispatch: any) => {
  try {
    dispatch(getUserStart())
    const usuario = await getUser(id)
    dispatch(getUserSuccess(usuario))
  } catch (error: any) {
    dispatch(getUserError(error.response.data.message))
  } 
}

export const updateUserAsync = (usuario: Usuario) => async (dispatch: any) => {
  try {
    dispatch(updateUserStart())
    const updatedUser = await updateUser(usuario)
    dispatch(updateUserSuccess(updatedUser))
  } catch (error: any) {
    dispatch(updateUserError(error.response.data.message))
  } 
}

export const changePasswordAsync = (password: string) => async (dispatch: any) => {
  try {
    dispatch(changePasswordStart())
    const response = await changePassword(password)
    dispatch(changePasswordSuccess(response.message))
    dispatch(showToast({
      type: 'success',
      message: response.message
    }))
  } catch (error: any) {
    dispatch(changePasswordError(error.response.data.message))
    dispatch(showToast({
      type: 'error',
      message: error.response.data.message
    }))
  }
}

export const deleteUserAsync = (id: string) => async (dispatch: any) => {
  try {
    dispatch(deleteUserStart())
    const response = await deleteUser(id)
    dispatch(deleteUserSuccess(response.message))
    dispatch(showToast({
      type: 'success',
      message: response.message
    }))
    // Cerrar sesión
    dispatch(clearUsuarioAuth())
    // Redireccionar a /
    window.location.href = '/'
  } catch (error: any) {
    dispatch(deleteUserError(error.response.data.message))
    dispatch(showToast({
      type: 'error',
      message: error.response.data.message
    }))
  } 
}
