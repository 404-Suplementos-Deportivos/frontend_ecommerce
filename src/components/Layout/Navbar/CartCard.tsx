import Image from "next/image"
import { XMarkIcon, PlusCircleIcon, MinusCircleIcon } from '@heroicons/react/24/outline'
import { Producto } from "@/interfaces/Producto"

interface CartCardProps {
  item: Producto
}

const CartCard = ({item}: CartCardProps) => {
  return (
    <div className="bg-blanco min-h-[150px] p-4 mt-4 shadow-lg grid grid-cols-3 gap-4">
      <div className="col-span-1">
        <Image src={item.urlImagen} className='object-fill w-full h-full' alt='Imagen Producto' width={120} height={260} />
      </div>
      <div className="col-span-2 flex flex-col justify-between">
        <div className="flex justify-between items-center">
          <p className="text-sm text-grisClaro">{item.nombre}</p>
          <XMarkIcon className="h-4 w-4 cursor-pointer" />
        </div>
        <div className="flex justify-between items-center">
          <div className="flex flex-row gap-3 items-center">
            <MinusCircleIcon className="h-6 w-6 cursor-pointer transition-colors duration-300 ease-in-out hover:text-amarillo" />
            <p>{item.cantidad}</p>
            <PlusCircleIcon className="h-6 w-6 cursor-pointer transition-colors duration-300 ease-in-out hover:text-amarillo" />
          </div>
          <div className="flex flex-col items-end">
            <p>${item.precioVenta}</p>
            <p><span className="font-bold">Subtotal:</span> ${item.subTotal}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartCard