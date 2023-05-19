import { useEffect, useState } from "react"
import { Modal, Input, Row, Checkbox, Button, Text, FormElement, Loading } from "@nextui-org/react"
import { ChangePassword, ChangePasswordSchema } from "@/interfaces/ChangePassword"
import { useAppSelector, useAppDispatch } from "@/hooks/useReduxStore"
import { changePasswordAsync } from "@/store/features/user/userSlice"
import { clearUserError } from "@/store/features/user/userSlice"
import { showToast } from "@/store/features/design/designSlice"

interface ChangePasswordState {
  password: string
  confirmPassword: string
  loading: boolean
  formErrors: ErrorForm[]
  paginaLista: boolean
}

type ErrorForm = {
  [key: string]: string
}

type InputChange = React.ChangeEvent<FormElement | HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>

const INITIAL_VALUES: ChangePassword = {
  password: '',
  confirmPassword: ''
}

const ChangePasswordComponent = () => {
  const dispatch = useAppDispatch()
  const [formErrors, setFormErrors] = useState<ChangePasswordState['formErrors']>([{}]);
  const [confirmPassword, setConfirmPassword] = useState<ChangePasswordState['confirmPassword']>(INITIAL_VALUES.confirmPassword)
  const [paginaLista, setPaginaLista] = useState<ChangePasswordState['paginaLista']>(false)
  const [password, setPassword] = useState<ChangePasswordState['password']>(INITIAL_VALUES.password)
  const [loading, setLoading] = useState<ChangePasswordState['loading']>(false)

  const handleChange = (e: InputChange) => {
    const { name, value } = e.target
    setFormErrors([{}])
    if (name === 'password') {
      setPassword(value)
    }
    if (name === 'confirmPassword') {
      setConfirmPassword(value)
    }
  }

  const handleSubmit = async () => {
    if (!validateForm()) return
    if(password !== confirmPassword) return dispatch(showToast({ type: 'error', message: 'Las contraseñas no coinciden' }))
    dispatch(changePasswordAsync(password))
  }

  // TODO: - Validacion en Tiempo Real al escribir
  const validateForm = (): boolean => {
    try {
      const validate = ChangePasswordSchema.parse({ password, confirmPassword })
      return true
    } catch (error: any) {
      const errores: ErrorForm[] = error.errors
      const FormPaths = errores.map((error: ErrorForm) => {
        const { path, message } = error
        return { [path]: message }
      })
      setFormErrors(FormPaths)
      return false
    }
  }

  const findErrorMessage = (fieldName: string): string => {
    const error = formErrors.find((error: ErrorForm) => error[fieldName] )
    if (error) {
      const errorMessage: string = Object.values(error)[0] as string
      return errorMessage;
    } else {
      return "";
    }
  }

  return (
    <div className="md:w-3/4 z-20 flex flex-col">
      <div className="mt-6">
        <Input.Password
          labelPlaceholder="Tu nueva password" 
          fullWidth
          underlined
          clearable={true}
          color="success"
          name="password"
          value={password}
          onChange={handleChange}
          helperText={findErrorMessage('password')}
          helperColor={findErrorMessage('password') ? 'error' : 'success'}
        />
      </div>
      <div className="mt-12">
        <Input.Password
          labelPlaceholder="Confirmar password"
          fullWidth
          underlined
          clearable={true}
          color="success"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleChange}
          helperText={findErrorMessage('confirmPassword')}
          helperColor={findErrorMessage('confirmPassword') ? 'error' : 'success'}
        />
      </div>
      <div className="w-full flex justify-end">
        <Button 
          onPress={handleSubmit} 
          className='w-2/5 bg-verde/90 text-blanco mt-4'
        >
          Guardar Cambios
        </Button>
      </div>
    </div>
  )
}

export default ChangePasswordComponent