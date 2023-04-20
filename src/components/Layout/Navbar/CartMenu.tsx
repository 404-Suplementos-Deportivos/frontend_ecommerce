import { useState } from "react"
import Link from "next/link"
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Producto } from "@/interfaces/Producto"
import { useAppSelector, useAppDispatch } from "@/hooks/useReduxStore"
import { toggleCart } from "@/store/features/design/designSlice"
import CartCard from "./CartCard"

const CartMenu = () => {
  const isCartMenuOpen = useAppSelector(state => state.design.isCartToggled)
  const dispatch = useAppDispatch()
  const { items, total } = useAppSelector(state => state.cart)

  return (
    <div className={`fixed md:right-0 z-[200]  transform transition-transform ease-in-out duration-300 ${isCartMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
      <div className='bg-grisClaro text-negro h-fit w-full md:h-[600px] md:w-[400px] flex flex-col justify-between'>
        <div>
          <div className="flex flex-row justify-between bg-grisMuyClaro p-4">
            <div>
              <h4>Carrito de Compras</h4>
              <p>{items.length} Producto/s</p>
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
            <Link
              href={''}
              className={`bg-grisClaro text-blanco p-6 text-center block w-full mt-2 transition-colors duration-300 ease-in-out hover:bg-amarillo`}
            >
              Finalizar Compra
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartMenu