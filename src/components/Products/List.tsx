import { Producto } from "@/interfaces/Producto"
import Card from "./Card"

interface ListProps {
  productos: Producto[]
}

const List = ({productos}: ListProps) => {
  return (
    <div className="my-10 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 xxl:grid-cols-5 gap-2">
      {productos.map((producto: Producto) => (
        <Card key={producto.id} producto={producto} />
      ))}
    </div>
  )
}

export default List