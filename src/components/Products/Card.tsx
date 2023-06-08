import Link from "next/link"
import Image from "next/image"
import { Producto } from "@/interfaces/Producto"

interface CardProps {
  producto: Producto
}

const Card = ({producto}: CardProps) => {
  const { id, nombre, precioVenta, urlImagen } = producto

  return (
    <Link href={`/products/${id}`} className="bg-blanco rounded-md shadow-md h-[300px] relative">
      <div className="w-full h-full absolute top-0 left-0 bg-gradient-to-b from-blanco/0 to-grisOscuro opacity-0 hover:opacity-70 transition-all duration-300 ease-in-out"></div>
      <div className="w-full h-full">
        <Image src={urlImagen} alt={nombre} width={300} height={300} className="w-full h-full object-cover" />
      </div>
      <div className="w-full h-[200] p-2 flex flex-row justify-between items-end absolute left-0 right-0 bottom-0">
        <p className="text-sm text-grisMuyClaro font-bold w-3/5">{nombre}</p>
        <p className="text-sm text-grisMuyClaro font-bold ">${precioVenta?.toFixed(2)}</p>
      </div>
    </Link>
  )
}

export default Card