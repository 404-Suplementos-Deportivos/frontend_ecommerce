import { useState, useEffect } from "react"
import { Producto } from "@/interfaces/Producto"
import { getProducts } from "@/services/products/productsService"
import Layout from "@/components/Layout/Layout"
import List from "@/components/Products/List"
import Filters from "@/components/Products/Filters"

export default function Products() {
  const [productos, setProductos] = useState<Producto[]>([])

  useEffect(() => {
    const getProductsData = async () => {
      try {
        const data = await getProducts()
        setProductos(data)
      } catch (error: any) {
        console.log(error)
      }
    }
    getProductsData()
  }, [])

  return (
    <Layout
      title="Productos"
    >
      <div className="md:mx-auto md:w-5/6">
        <h3 className="text-2xl font-bold text-grisOscuro my-5">Nuestros productos</h3>
        <div>
          <Filters />
        </div>
        <List productos={productos} />
      </div>
    </Layout>
  )
}
