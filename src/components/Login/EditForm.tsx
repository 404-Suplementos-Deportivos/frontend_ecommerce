import { useEffect, useState } from "react"
import { Modal, Input, Row, Checkbox, Button, Text, FormElement, Loading } from "@nextui-org/react"
import { Usuario, UsuarioEditSchema } from "@/interfaces/Usuario"
import { useAppSelector, useAppDispatch } from "@/hooks/useReduxStore"
import { updateUserAsync } from "@/store/features/user/userSlice"
import { clearUserError } from "@/store/features/user/userSlice"
import { showToast } from "@/store/features/design/designSlice"

interface EditFormState {
  usuario: Usuario
  loading: boolean
  formErrors: ErrorForm[]
  editar: boolean
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

const EditForm = () => {
  const dispatch = useAppDispatch()
  const [usuario, setUsuario] = useState<EditFormState['usuario']>(INITIAL_VALUES)
  const { usuario: user, error, loading } = useAppSelector(state => state.user)
  const [formErrors, setFormErrors] = useState<EditFormState['formErrors']>([{}]);
  const [paginaLista, setPaginaLista] = useState(false)
  const [editar, setEditar] = useState(false)

  // TODO: - Solucionar el problema de Hidratacion de React
  useEffect(() => {
    if (user) {
      setUsuario(user)
      setPaginaLista(true)
    }
    setPaginaLista(true)
  }, [user])

  // TODO: - Solucionar el problema Toast Error doble al actualizar - Doble Render React
  useEffect(() => {
    if (error.type === 'error') {
      dispatch(showToast(error))
      dispatch(clearUserError())
    }
    if (error.type === 'success') {
      setEditar(false)
      dispatch(showToast(error))
      dispatch(clearUserError())
    }
  }, [error, dispatch]);

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
    dispatch(updateUserAsync(usuario))
  }

  // TODO: - Validacion en Tiempo Real al escribir
  const validateForm = (): boolean => {
    try {
      const validate = UsuarioEditSchema.parse(usuario)
      return true
    } catch (error: any) {
      const errores: ErrorForm[] = error.errors
      const FormPaths = errores.map((error: ErrorForm) => {
        const { path, message } = error
        return { [path]: message }
      })
      setFormErrors(FormPaths)
      console.log( errores )
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

  // TODO: - Solucionar el problema de "Not recognize the `isSelected` prop on a DOM element."
  return (
    paginaLista ? (
      <div className="md:w-3/4 z-20 flex flex-col">
        <div className="w-full flex justify-end">
          <Checkbox color="success" size="sm" onChange={() => setEditar(!editar)} isSelected={editar}>
            Editar datos
          </Checkbox>
        </div>
        <div className="mt-6">
          <Input
            type="text"
            labelPlaceholder="Tu nombre" 
            fullWidth
            underlined
            clearable={editar}
            disabled={!editar}
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
            clearable={editar}
            disabled={!editar}
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
            clearable={editar}
            disabled={!editar}
            color="success"
            name="email"
            value={usuario.email}
            onChange={handleChange}
            helperText={findErrorMessage('email')}
            helperColor={findErrorMessage('email') ? 'error' : 'success'}
          />
        </div>
        <div className="mt-12">
          <Input
            labelPlaceholder="Direccion" 
            fullWidth
            underlined
            clearable={editar}
            disabled={!editar}
            color="success"
            placeholder="Calle, Nro, Piso, Depto, Barrio"
            name="direccion"
            value={usuario.direccion}
            onChange={handleChange}
            helperText={findErrorMessage('direccion')}
            helperColor={findErrorMessage('direccion') ? 'error' : 'success'}
          />
        </div>
        <div className="mt-6">
          <Input
            type="number"
            label="Codigo Postal" 
            fullWidth
            underlined
            clearable={editar}
            disabled={!editar}
            color="success"
            min={1000}
            name="codigoPostal"
            value={usuario.codigoPostal ? Number(usuario.codigoPostal) : ''}
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
            clearable={editar}
            disabled={!editar}
            color="success"
            name="telefono"
            value={usuario.telefono ? usuario.telefono : ''}
            onChange={handleChange}
            helperText={findErrorMessage('telefono')}
            helperColor={findErrorMessage('telefono') ? 'error' : 'success'}
          />
        </div>
        <div className="mt-6">
          <Input
            label="Fecha de Nacimiento" 
            fullWidth
            underlined
            disabled={!editar}
            type="date" 
            color="success"
            name="fechaNacimiento"
            value={usuario.fechaNacimiento ? usuario.fechaNacimiento : ''}
            onChange={handleChange}
            helperText={findErrorMessage('fechaNacimiento')}
            helperColor={findErrorMessage('fechaNacimiento') ? 'error' : 'success'}
          />
        </div>
        <div className="w-full flex justify-end">
          <Button 
            onPress={handleSubmit} 
            disabled={!editar}
            className='w-2/5 bg-verde/90 text-blanco mt-4'
            style={{ cursor: !editar ? 'not-allowed' : 'pointer', opacity: !editar ? 0.5 : 1 }}
          >
            Guardar Cambios
          </Button>
        </div>
      </div>
    ) : null
  ) 
}

export default EditForm