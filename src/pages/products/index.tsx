import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import Image from "next/image"
import Layout from "@/components/Layout/Layout"
import List from "@/components/Products/List"
import Filters from "@/components/Products/Filters"
import IconoProte from 'public/icons8-protein-supplement-96.png'
import { useAppSelector, useAppDispatch } from "@/hooks/useReduxStore"
import { 
  getProductsAsync, 
  getCategoriesAsync, 
  getSubcategoriesAsync,
  setCategoriaSelectedURL,
  setSubcategoriaSelectedURL,
  setProductsFiltered
} from "@/store/features/product/productsSlice"


export default function Products() {
  const { productos, productosFiltered, categorias, subcategorias, loading, error } = useAppSelector(state => state.productos)
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { categoriaSelected, subcategoriaSelected } = router.query

  useEffect(() => {
    dispatch(getCategoriesAsync())  
    if (categoriaSelected && subcategoriaSelected) {
      dispatch(setCategoriaSelectedURL(categoriaSelected.toString()))
      dispatch(setSubcategoriaSelectedURL(subcategoriaSelected.toString()))      
      dispatch(getSubcategoriesAsync(Number(categoriaSelected)))
      dispatch(getProductsAsync({categoria: categoriaSelected.toString(), subcategoria: subcategoriaSelected.toString()}))
    } else if (categoriaSelected && !subcategoriaSelected) {
      dispatch(setCategoriaSelectedURL(categoriaSelected.toString()))
      dispatch(setSubcategoriaSelectedURL(undefined))
      dispatch(getSubcategoriesAsync(Number(categoriaSelected)))
      dispatch(getProductsAsync({categoria: categoriaSelected.toString(), subcategoria: undefined}))
    } else if (!categoriaSelected && subcategoriaSelected) {
      dispatch(setCategoriaSelectedURL(undefined))
      dispatch(setSubcategoriaSelectedURL(subcategoriaSelected.toString()))
      dispatch(getProductsAsync({categoria: undefined, subcategoria: subcategoriaSelected.toString()}))
    } else if(!categoriaSelected && !subcategoriaSelected) {
      dispatch(setCategoriaSelectedURL(undefined))
      dispatch(setSubcategoriaSelectedURL(undefined))
      dispatch(getProductsAsync({categoria: undefined, subcategoria: undefined}))
    }
  }, [categoriaSelected, subcategoriaSelected, dispatch])

  useEffect(() => {
    dispatch(setProductsFiltered(productos))
  }, [productos, dispatch])

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
        <List productos={productosFiltered} />
        {error && <p className="text-red-500">{error.message}</p>}
        {productosFiltered.length === 0 && !loading && (
          <div className="flex flex-col md:flex-row justify-center items-center h-60 py-6">
            <Image src={IconoProte} alt="Icono Prote" width={150} height={150} />
            <div>
              <p className="text-center text-xl font-bold text-grisOscuro">No hay productos</p>
              <p className="text-center text-xl font-bold text-grisOscuro">en esta categoría</p>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}
