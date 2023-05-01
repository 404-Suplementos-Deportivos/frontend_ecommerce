import { useEffect } from "react"
import { useRouter } from "next/router"
import { XMarkIcon, TrashIcon } from '@heroicons/react/24/outline'
import { Producto } from "@/interfaces/Producto"
import { useAppSelector, useAppDispatch } from "@/hooks/useReduxStore"
import { toggleCart, toggleModalLogin } from "@/store/features/design/designSlice"
import { clearCart } from "@/store/features/product/cartSlice"
import CartCard from "./CartCard"
import { getCartData } from "@/store/features/product/cartSlice"

const CartMenu = () => {
  const isCartMenuOpen = useAppSelector(state => state.design.isCartToggled)
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { items, total } = useAppSelector(state => state.cart)
  const { isAuth } = useAppSelector(state => state.auth)

  useEffect(() => {
    dispatch(getCartData(isAuth))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth])

  const handleClick = () => {
    if(isAuth) {
      dispatch(toggleCart(false))
      router.push('/checkout')
    } else {
      dispatch(toggleCart(false))
      dispatch(toggleModalLogin(true))
    }
  }

  const isCartEmpty = items.length === 0

  return (
    <div className={`fixed right-0 z-[200] transform transition-transform ease-in-out duration-300 ${isCartMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
      <div className='bg-grisClaro text-negro w-screen h-fit md:w-[400px] md:h-[600px] flex flex-col justify-between'> 
        <div>
          <div className="flex flex-row justify-between bg-grisMuyClaro p-4">
            <div>
              <h4 className="font-extrabold">Carrito de Compras</h4>
              <p>{items.length} Producto/s</p>
              <TrashIcon className="h-6 w-6 cursor-pointer" onClick={() => dispatch(clearCart({isAuth}))} />
            </div>
            <div>
              <XMarkIcon className="h-6 w-6 cursor-pointer" onClick={() => dispatch(toggleCart(false))} />
            </div>
          </div>

          <div className="max-h-[400px] overflow-y-auto ">
            {items.length === 0 && (
              <p className="text-blanco text-center pt-4">No hay productos en el carrito</p>
            )}
            {items.map((item: Producto) => (
              <CartCard key={item.id} item={item} />
            ))}
          </div>
        </div>

        <div className=" flex flex-col bg-grisMuyClaro p-4 mt-4">
          <div className="text-right">
            Subtotal: <span className="font-bold">${total}</span>
          </div>
          <div>
            <button
              className={`bg-grisClaro text-blanco p-6 text-center block w-full mt-2 transition-colors duration-300 ease-in-out ${isCartEmpty ? 'cursor-not-allowed disabled' : 'hover:bg-amarillo'}`}
              disabled={isCartEmpty}
              onClick={handleClick}
            >
              Finalizar Compra
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartMenu