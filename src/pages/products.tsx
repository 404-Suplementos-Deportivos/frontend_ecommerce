import { useState, useEffect } from "react"
import { Producto } from "@/interfaces/Producto"
import { getProducts } from "@/services/products/productsService"
import Layout from "@/components/Layout/Layout"
import List from "@/components/Products/List"
import Card from "@/components/Products/Card"

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
        <h3>Nuestro Productos</h3>
        <div>
          Filtros
        </div>
        <List productos={productos} />
      </div>
    </Layout>
  )
}
