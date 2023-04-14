import Link from "next/link"
import Image from "next/image"
import { Producto } from "@/interfaces/Producto"

interface CardProps {
  producto: Producto
}

const Card = ({producto}: CardProps) => {
  const { nombre, descripcion, precioLista, urlImagen, estado } = producto

  return (
    <div className="bg-blanco rounded-md shadow-md flex flex-col">
      <div className="h-48 w-full">
        <Image src={urlImagen} className="rounded-md object-fill" alt="Imagen del producto" width={300} height={300} />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold">{nombre}</h3>
        <p className="text-sm text-gray-500">{descripcion}</p>
        <p className="text-sm text-gray-500">{estado}</p>
        <p className="text-sm text-gray-500">${precioLista}</p>
        <Link href={`/products/${producto.id}`} className="block w-full text-center bg-gray-800 text-white rounded-md py-2 mt-4">
          Ver más
        </Link>
      </div>
    </div>
  )
}

export default Card