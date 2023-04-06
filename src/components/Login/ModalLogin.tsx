import { useState } from "react"
import { Modal, Button, Text } from "@nextui-org/react"
import Login from "./Login"
import Register from "./Register"
import { useAppSelector, useAppDispatch } from "@/hooks/useReduxStore"
import { toggleModalLogin } from "@/store/features/design/designSlice"

interface ModalLoginState {
  isLoginVisible: boolean
}

const ModalLogin = () => {
  const isModalLoginVisible = useAppSelector(state => state.design.isModalLoginVisible)
  const [isLoginVisible, setIsLoginVisible] = useState<ModalLoginState['isLoginVisible']>(true)
  const dispatch = useAppDispatch()

  const closeHandler = () => {
    loginHandler(true)
    dispatch(toggleModalLogin(false))
  }

  const loginHandler = (value: boolean) => {
    setIsLoginVisible(value)
  }

  return (
    <div>
      <Modal
        animated
        closeButton
        blur
        color=""
        aria-labelledby="modal-title"
        open={isModalLoginVisible}
        onClose={closeHandler}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Bienvenido a {''}
            <Text b size={18} className='logo inverted'>
              404
            </Text>
          </Text>
        </Modal.Header>
        <Modal.Body>
          <div className="grid grid-cols-2 border-b-[1px] border-b-grisClaro">
            <div className={`m-0 col-span-1 text-center ${isLoginVisible && 'border-b-2 border-verde'}`}>
              <p onClick={() => loginHandler(true)}>Ingresar</p>
            </div>
            <div className={`m-0 col-span-1 text-center ${!isLoginVisible && 'border-b-2 border-verde'}`}>
              <p onClick={() => loginHandler(false)}>Crear cuenta</p>
            </div>
          </div>
        </Modal.Body>
        <Modal.Body>
          {isLoginVisible ? (
            <Login closeHandler={closeHandler} />
          ): (
            <Register closeHandler={closeHandler} />
          )}
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default ModalLogin