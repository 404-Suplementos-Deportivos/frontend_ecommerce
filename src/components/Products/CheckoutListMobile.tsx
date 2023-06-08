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
      {items.map(item => (
        <CartCard key={item.id} item={item} />
      ))}
      <div className="mt-6 py-2 flex justify-between border-t border-t-grisMuyClaro">
        <div className="flex flex-col w-fit">
          <div className="flex flex-row  gap-4">
            <p className="font-bold">Subtotal</p>
            <p className="font-light">${total.toFixed(2)}</p>
          </div>
          <div className="flex flex-row  gap-4">
            <p className="font-bold">Envío</p>
            <p className="font-light">Free</p>
          </div>
        </div>
        <div className="flex flex-row gap-4">
          <p className="text-xl font-bold">Total</p>
          <p className="text-xl font-bold">${total.toFixed(2)}</p>
        </div>
      </div>
    </>
  )
}

export default CheckoutListMobile