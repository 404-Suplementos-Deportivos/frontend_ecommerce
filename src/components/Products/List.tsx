import { Producto } from "@/interfaces/Producto"
import Card from "./Card"

interface ListProps {
  productos: Producto[]
}

const List = ({productos}: ListProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {productos.map((producto: Producto) => (
        <Card key={producto.id} producto={producto} />
      ))}
    </div>
  )
}

export default List