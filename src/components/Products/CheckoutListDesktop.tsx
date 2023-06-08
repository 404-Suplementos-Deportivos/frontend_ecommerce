import Image from "next/image"
import { XMarkIcon, PlusCircleIcon, MinusCircleIcon } from '@heroicons/react/24/outline'
import { useAppSelector, useAppDispatch } from "@/hooks/useReduxStore"
import { addQuantity, removeQuantity, removeFromCart } from "@/store/features/product/cartSlice"

const CheckoutListDesktop = () => {
  const dispatch = useAppDispatch()
  const { items, total } = useAppSelector(state => state.cart)
  const { isAuth } = useAppSelector(state => state.auth)

  return (
    <>
      <div className="mt-4 grid grid-cols-5">
        <div className="col-span-2">
          <p className="font-bold">Producto</p>
        </div>
        <div className="col-span-1 text-center">
          <p className="font-bold">Cantidad</p>
        </div>
        <div className="col-span-1 text-center">
          <p className="font-bold">Subtotal</p>
        </div>
        <div className="col-span-1">
        </div>
      </div>
      {items.map(item => (
        <div className="mt-4 grid grid-cols-5 border-b border-b-grisMuyClaro pb-4" key={item.id}>
          <div className="col-span-2 flex flex-row items-center gap-4">
            <Image src={item.urlImagen} className='object-fill' alt='Imagen Producto' width={140} height={140} />
            <div>
              <p className="font-bold">{item.nombre}</p>
              <p className="font-light">${item.precioVenta.toFixed(2)}</p>
            </div>
          </div>
          <div className="col-span-1 flex flex-row gap-3 items-center justify-center">
            <MinusCircleIcon
              className="h-6 w-6 cursor-pointer transition-colors duration-300 ease-in-out hover:text-amarillo"
              onClick={() => dispatch(removeQuantity({
                idProducto: Number(item?.id),
                isAuth: isAuth
              }))}
            />
            <p>{item.cantidad}</p>
            <PlusCircleIcon
              className="h-6 w-6 cursor-pointer transition-colors duration-300 ease-in-out hover:text-amarillo"
              onClick={() => dispatch(addQuantity({
                idProducto: Number(item?.id),
                isAuth: isAuth
              }))}
            />
          </div>
          <div className="col-span-1 flex flex-row gap-3 items-center justify-center">
            <p>${item.subTotal?.toFixed(2)}</p>
          </div>
          <div className="col-span-1 flex flex-row gap-3 items-center justify-end">
            <XMarkIcon
              className="h-6 w-6 cursor-pointer transition-colors duration-300 ease-in-out hover:text-amarillo"
              onClick={() => dispatch(removeFromCart({
                idProducto: Number(item?.id),
                isAuth: isAuth
              }))}
            />
          </div>
        </div>
      ))}
      <div className="mt-4 flex justify-end">
        <div className="flex flex-col w-fit">
          <div className="flex flex-row justify-between gap-4">
            <p className="font-bold">Subtotal</p>
            <p className="font-light">${total.toFixed(2)}</p>
          </div>
          <div className="flex flex-row justify-between gap-4">
            <p className="font-bold">Envío</p>
            <p className="font-light">Free</p>
          </div>
          <div className="mt-4 pt-2 flex flex-row justify-between gap-4 border-t border-t-grisMuyClaro">
            <p className="text-xl font-bold">Total</p>
            <p className="text-xl font-bold">${total.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default CheckoutListDesktop