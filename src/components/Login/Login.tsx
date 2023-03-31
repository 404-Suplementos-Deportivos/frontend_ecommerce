import { Modal, Input, Row, Checkbox, Button, Text } from "@nextui-org/react"

interface LoginProps {
  closeHandler: () => void
}

const Login = ({closeHandler}: LoginProps) => {

  const handleSubmit = () => {

  }

  return (
    <>
      <div>
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
          <Input.Password
            labelPlaceholder="Tu clave" 
            fullWidth
            underlined
            clearable
            color="success"
          />
        </div>
        <Row justify="space-between" className="mt-6">
          <Checkbox>
            <Text size={14}>Recuerdame</Text>
          </Checkbox>
          <Text size={14}>Olvidaste tu clave?</Text>
        </Row>
      </div>
      <Modal.Footer>
        <Button auto flat onPress={closeHandler} className='bg-rojo/90 text-blanco'>
          Cerrar
        </Button>
        <Button auto flat onPress={handleSubmit} className='bg-verde/90 text-blanco'>
          Ingresar
        </Button>
      </Modal.Footer>
    </>
  )
}

export default Login