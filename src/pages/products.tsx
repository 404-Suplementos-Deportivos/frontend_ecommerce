import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import Layout from "@/components/Layout/Layout"
import List from "@/components/Products/List"
import Filters from "@/components/Products/Filters"
import { useAppSelector, useAppDispatch } from "@/hooks/useReduxStore"
import { getProductsAsync, getCategoriesAsync, getSubcategoriesAsync } from "@/store/features/product/productsSlice"


export default function Products() {
  const { productos, categorias, subcategorias, loading } = useAppSelector(state => state.productos)
  const dispatch = useAppDispatch()
  const router = useRouter()
  console.log( router.query )

  useEffect(() => {
    Promise.all([
      dispatch(getProductsAsync()),
      dispatch(getCategoriesAsync())
    ])
  }, [dispatch])

  useEffect(() => {
    if (categorias.length > 0 && categorias[0].id) {
      dispatch(getSubcategoriesAsync(categorias[0].id))
    }
  }, [categorias, dispatch])

  return (
    <Layout
      title="Productos"
    >
      <div className="mx-auto w-5/6">
        <h3 className="text-2xl font-bold text-grisOscuro my-5">Nuestros productos</h3>
        <div>
          <Filters 
            categorias={categorias}
            subcategorias={subcategorias}
          />
        </div>
        <List productos={productos} />
      </div>
    </Layout>
  )
}
