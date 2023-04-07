import { useState } from "react"
import { Modal, Input, Row, Checkbox, Button, Text, FormElement, Loading } from "@nextui-org/react"
import { Usuario, UsuarioSchema, UsuarioType } from "@/interfaces/Usuario"
import { useAppDispatch } from "@/hooks/useReduxStore"
import { showToast } from "@/store/features/design/designSlice"
import { register } from "@/services/users/authService"

interface RegisterProps {
  closeHandler: () => void
}

interface RegisterState {
  usuario: Usuario
  loading: boolean
  passwordConfirm: string
  formErrors: ErrorForm[]
}

type ErrorForm = {
  [key: string]: string
}

type InputChange = React.ChangeEvent<FormElement | HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>

const INITIAL_VALUES: Usuario = {
  nombre: '',
  apellido: '',
  email: '',
  password: '',
  direccion: '',
  codigoPostal: 0,
  telefono: null,
  fechaNacimiento: null
}

const Register = ({closeHandler}: RegisterProps) => {
  const dispatch = useAppDispatch()
  const [usuario, setUsuario] = useState<RegisterState['usuario']>(INITIAL_VALUES)
  const [passwordConfirm, setPasswordConfirm] = useState<RegisterState['passwordConfirm']>('')
  const [formErrors, setFormErrors] = useState<RegisterState['formErrors']>([{}]);
  const [loading, setLoading] = useState<RegisterState['loading']>(false)

  const handleChange = (e: InputChange) => {
    const { name, value } = e.target
    if(name === 'codigoPostal') {
      setUsuario({ ...usuario, [name]: Number(value) })
      return
    }
    setUsuario({ ...usuario, [name]: value })
  }

  const handleSubmit = async () => {
    if (!validateForm()) return
    try {
      setLoading(true)
      const data = await register(usuario)
      setUsuario(INITIAL_VALUES)
      closeHandler()
      dispatch(showToast({
        type: 'success',
        message: data.message
      }))
    } catch (error: any) {
      dispatch(showToast({
        type: 'error',
        message: error.response.data.message
      }))
    } finally {
      setLoading(false)
    }
  }

  // TODO - Validacion en Tiempo Real al escribir
  const validateForm = (): boolean => {
    try {
      const validate = UsuarioSchema.parse(usuario)
      if (validate.password !== passwordConfirm || passwordConfirm === '') {
        setFormErrors([{ passwordConfirm: 'Las contraseñas no coinciden' }])
        return false
      } else {
        setFormErrors([{}])
      }
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
  };

  return (
    <>
      <div className="max-h-[400px] overflow-y-auto overflow-x-hidden">
        <div className="mt-6">
          <Input
            type="text"
            labelPlaceholder="Tu nombre" 
            fullWidth
            underlined
            clearable
            color="success"
            name="nombre"
            value={usuario.nombre}
            onChange={handleChange}
            helperText={findErrorMessage('nombre')}
            helperColor={findErrorMessage('nombre') ? 'error' : 'success'}
          />
        </div>
        <div className="mt-12">
          <Input
            labelPlaceholder="Tu apellido" 
            fullWidth
            underlined
            clearable
            color="success"
            name="apellido"
            value={usuario.apellido}
            onChange={handleChange}
            helperText={findErrorMessage('apellido')}
            helperColor={findErrorMessage('apellido') ? 'error' : 'success'}
          />
        </div>
        <div className="mt-12">
          <Input
            labelPlaceholder="Tu e-mail" 
            fullWidth
            underlined
            clearable
            color="success"
            name="email"
            value={usuario.email}
            onChange={handleChange}
            helperText={findErrorMessage('email')}
            helperColor={findErrorMessage('email') ? 'error' : 'success'}
          />
        </div>
        <div className="mt-12">
          <Input.Password
            labelPlaceholder="Utiliza una clave compleja" 
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
        <div className="mt-12">
          <Input.Password
            labelPlaceholder="Repite tu clave" 
            fullWidth
            underlined
            clearable
            color="success"
            name="passwordConfirm"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            helperText={findErrorMessage('passwordConfirm')}
            helperColor={findErrorMessage('passwordConfirm') ? 'error' : 'success'}
          />
        </div>
        <div className="mt-12">
          <Input
            labelPlaceholder="Direccion" 
            fullWidth
            underlined
            clearable
            color="success"
            name="direccion"
            value={usuario.direccion}
            onChange={handleChange}
            helperText={findErrorMessage('direccion')}
            helperColor={findErrorMessage('direccion') ? 'error' : 'success'}
          />
        </div>
        <div className="mt-12">
          <Input
            type="number"
            label="Codigo Postal" 
            fullWidth
            underlined
            clearable
            color="success"
            name="codigoPostal"
            value={Number(usuario.codigoPostal)}
            onChange={handleChange}
            helperText={findErrorMessage('codigoPostal')}
            helperColor={findErrorMessage('codigoPostal') ? 'error' : 'success'}
          />
        </div>
        <div className="mt-12">
          <Input
            labelPlaceholder="Telefono" 
            fullWidth
            underlined
            clearable
            color="success"
            name="telefono"
            value={usuario.telefono ? usuario.telefono : ''}
            onChange={handleChange}
            helperText={findErrorMessage('telefono')}
            helperColor={findErrorMessage('telefono') ? 'error' : 'success'}
          />
        </div>
        <div className="mt-12">
          <Input
            label="Fecha de Nacimiento" 
            fullWidth
            underlined
            clearable
            type="date" 
            color="success"
            name="fechaNacimiento"
            value={usuario.fechaNacimiento ? usuario.fechaNacimiento : ''}
            onChange={handleChange}
            helperText={findErrorMessage('fechaNacimiento')}
            helperColor={findErrorMessage('fechaNacimiento') ? 'error' : 'success'}
          />
        </div>
      </div>
      <Modal.Footer className="flex flex-col w-full">
        {loading && <Loading className="my-2" type="gradient" color="success" />}
        <div className="self-end flex flex-row gap-2">
          <Button auto flat onPress={closeHandler} className='bg-rojo/90 text-blanco'>
            Cerrar
          </Button>
          <Button auto flat onPress={handleSubmit} className='bg-verde/90 text-blanco'>
            Registrarme
          </Button>
        </div>
      </Modal.Footer>
    </>
  )
}

export default Register