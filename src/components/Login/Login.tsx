import { useState } from "react"
import { Modal, Input, Row, Checkbox, Button, Text, FormElement, Loading } from "@nextui-org/react"
import { UsuarioLogin } from "@/interfaces/UsuarioLogin"
import { UsuarioLoginSchema } from "@/interfaces/UsuarioLogin"
import { UsuarioAuth } from "@/interfaces/UsuarioAuth"
import { useAppDispatch } from "@/hooks/useReduxStore"
import { setUsuarioAuth } from "@/store/features/auth/authSlice"
import { showToast } from "@/store/features/design/designSlice"
import axios from '@/libs/axios'

interface LoginProps {
  closeHandler: () => void
}

interface LoginState {
  usuario: UsuarioLogin
  loading: boolean
  formErrors: ErrorForm[]
}

type ErrorForm = {
  [key: string]: string
}

type InputChange = React.ChangeEvent<FormElement | HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>

const INITIAL_VALUES: UsuarioLogin = {
  email: '',
  password: ''
}

const Login = ({closeHandler}: LoginProps) => {
  const dispatch = useAppDispatch()
  const [usuario, setUsuario] = useState<LoginState['usuario']>(INITIAL_VALUES)
  const [formErrors, setFormErrors] = useState<LoginState['formErrors']>([{}])
  const [loading, setLoading] = useState<LoginState['loading']>(false)

  const handleChange = (e: InputChange) => {
    const { name, value } = e.target
    setUsuario({ ...usuario, [name]: value })
  }

  const handleSubmit = async () => { 
    if (!validateForm()) return
    try {
      setLoading(true)
      const { data } = await axios.post<UsuarioAuth>('/auth/login', usuario)
      setUsuario(INITIAL_VALUES)
      dispatch(setUsuarioAuth(data))
      closeHandler()
      dispatch(showToast({
        type: 'success',
        message: `Bienvenido ${data.nombre}`
      }))
    } catch (error) {
      dispatch(showToast({
        type: 'error',
        message: 'Error al iniciar sesión'
      }))
    } finally {
      setLoading(false)
    }
  }

  const validateForm = (): boolean => {
    try {
      const validate = UsuarioLoginSchema.parse(usuario)
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
    <>
      <div>
        <div className="mt-6">
          <Input
            labelPlaceholder="Tu email" 
            fullWidth
            underlined
            clearable
            color="success"
            type="email"
            name="email"
            value={usuario.email}
            onChange={handleChange}
            helperText={findErrorMessage('email')}
            helperColor={findErrorMessage('email') ? 'error' : 'success'}
          />
        </div>
        <div className="mt-12">
          <Input.Password
            labelPlaceholder="Tu clave" 
            fullWidth
            underlined
            clearable
            color="success"
            name="password"
            value={usuario.password}
            onChange={handleChange}
            helperText={findErrorMessage('password')}
            helperColor={findErrorMessage('password') ? 'error' : 'success'}
          />
        </div>
        <Row justify="space-between" className="mt-6">
          <Checkbox>
            <Text size={14}>Recuerdame</Text>
          </Checkbox>
          <Text size={14}>Olvidaste tu clave?</Text>
        </Row>
      </div>
      <Modal.Footer className="flex flex-col w-full">
        {loading && <Loading className="my-2" type="gradient" color="success" />}
        <div className="self-end flex flex-row gap-2">
          <Button auto flat onPress={closeHandler} className='bg-rojo/90 text-blanco'>
            Cerrar
          </Button>
          <Button auto flat onPress={handleSubmit} className='bg-verde/90 text-blanco'>
            Ingresar
          </Button>
        </div>
      </Modal.Footer>
    </>
  )
}

export default Login