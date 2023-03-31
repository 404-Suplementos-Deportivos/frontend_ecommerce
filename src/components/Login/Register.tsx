import { Modal, Input, Row, Checkbox, Button, Text } from "@nextui-org/react"

interface RegisterProps {
  closeHandler: () => void
}
const Register = ({closeHandler}: RegisterProps) => {

  const handleSubmit = () => {

  }

  return (
    <>
      <div className="max-h-[400px] overflow-y-auto overflow-x-hidden">
        <div className="mt-6">
          <Input
            labelPlaceholder="Tu nombre" 
            fullWidth
            underlined
            clearable
            color="success"
          />
        </div>
        <div className="mt-12">
          <Input
            labelPlaceholder="Tu apellido" 
            fullWidth
            underlined
            clearable
            color="success"
          />
        </div>
        <div className="mt-12">
          <Input
            labelPlaceholder="Tu e-mail" 
            fullWidth
            underlined
            clearable
            color="success"
          />
        </div>
        <div className="mt-12">
          <Input.Password
            labelPlaceholder="Utiliza una clave compleja" 
            fullWidth
            underlined
            clearable
            color="success"
          />
        </div>
        <div className="mt-12">
          <Input.Password
            labelPlaceholder="Repite tu clave" 
            fullWidth
            underlined
            clearable
            color="success"
          />
        </div>
        <div className="mt-12">
          <Input
            labelPlaceholder="Direccion" 
            fullWidth
            underlined
            clearable
            color="success"
          />
        </div>
        <div className="mt-12">
          <Input
            labelPlaceholder="Codigo Postal" 
            fullWidth
            underlined
            clearable
            color="success"
          />
        </div>
        <div className="mt-12">
          <Input
            labelPlaceholder="Telefono" 
            fullWidth
            underlined
            clearable
            color="success"
          />
        </div>
        <div className="mt-12">
          <Input
            labelPlaceholder="Fecha de Nacimiento" 
            fullWidth
            underlined
            clearable
            type="date" 
            color="success"
          />
        </div>
      </div>
      <Modal.Footer>
        <Button auto flat onPress={closeHandler} className='bg-rojo/90 text-blanco'>
          Cerrar
        </Button>
        <Button auto flat onPress={handleSubmit} className='bg-verde/90 text-blanco'>
          Registrarme
        </Button>
      </Modal.Footer>
    </>
  )
}

export default Register