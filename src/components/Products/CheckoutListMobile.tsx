import Image from "next/image"
import CartCard from "../Layout/Navbar/CartCard"
import { XMarkIcon, PlusCircleIcon, MinusCircleIcon } from '@heroicons/react/24/outline'
import { useAppSelector, useAppDispatch } from "@/hooks/useReduxStore"
import { addQuantity, removeQuantity, removeFromCart } from "@/store/features/product/cartSlice"

const CheckoutListMobile = () => {
  const dispatch = useAppDispatch()
  const { items, total } = useAppSelector(state => state.cart)

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
        <CartCard key={item.id} item={item} />
      ))}
      <div className="mt-6 py-2 flex justify-between border-t border-t-grisMuyClaro">
        <div className="flex flex-col w-fit">
          <div className="flex flex-row  gap-4">
            <p className="font-bold">Subtotal</p>
            <p className="font-light">${total}</p>
          </div>
          <div className="flex flex-row  gap-4">
            <p className="font-bold">Envío</p>
            <p className="font-light">Free</p>
          </div>
        </div>
        <div className="flex flex-row gap-4">
          <p className="text-xl font-bold">Total</p>
          <p className="text-xl font-bold">${total}</p>
        </div>
      </div>
    </>
  )
}

export default CheckoutListMobile