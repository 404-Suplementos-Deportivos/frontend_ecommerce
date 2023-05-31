import { useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Layout from "@/components/Layout/Layout";
import List from "@/components/Products/List";
import Filters from "@/components/Products/Filters";
import IconoProte from 'public/icons/icons8-protein-supplement-96.png';
import { useAppSelector, useAppDispatch } from "@/hooks/useReduxStore";
import {
  getProductsAsync,
  getCategoriesFiltersAsync,
  getSubcategoriesFiltersAsync,
  setCategoriaSelectedURL,
  setSubcategoriaSelectedURL,
  setProductsFiltered
} from "@/store/features/product/productsSlice";
import { toggleNavbar } from "@/store/features/design/designSlice";

export default function Products() {
  const { productos, productosFiltered, categoriasFilters, subcategoriasFilters, loading, error } = useAppSelector(state => state.productos);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { categoriaSelected, subcategoriaSelected } = router.query;

  useEffect(() => {
    dispatch(toggleNavbar(false));
    dispatch(getCategoriesFiltersAsync());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const loadData = async () => {
      if (categoriaSelected || subcategoriaSelected) {
        dispatch(setCategoriaSelectedURL(categoriaSelected?.toString()));
        dispatch(setSubcategoriaSelectedURL(subcategoriaSelected?.toString()));
        await dispatch(getSubcategoriesFiltersAsync(Number(categoriaSelected)));
        await dispatch(getProductsAsync({ categoria: categoriaSelected?.toString(), subcategoria: subcategoriaSelected?.toString() }));
      } else {
        dispatch(setCategoriaSelectedURL(undefined));
        dispatch(setSubcategoriaSelectedURL(undefined));
        await dispatch(getProductsAsync({ categoria: undefined, subcategoria: undefined }));
      }
    };

    loadData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoriaSelected, subcategoriaSelected]);

  useEffect(() => {
    dispatch(setProductsFiltered(productos));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productos]);

  const noProductosMessage = productosFiltered.length === 0 && !loading && (
    <div className="flex flex-col md:flex-row justify-center items-center h-60 py-6">
      <Image src={IconoProte} alt="Icono Prote" width={150} height={150} />
      <div>
        <p className="text-center text-xl font-bold text-grisOscuro">No hay productos</p>
        <p className="text-center text-xl font-bold text-grisOscuro">en esta categoría</p>
      </div>
    </div>
  );

  return (
    <Layout title="Productos">
      <div className="mx-auto w-5/6">
        <h3 className="text-2xl font-bold text-grisOscuro my-5">Nuestros productos</h3>
        <div>
          {categoriasFilters && subcategoriasFilters && (
            <Filters
              categorias={categoriasFilters}
              subcategorias={subcategoriasFilters}
            />
          )}
        </div>
        <List productos={productosFiltered} />
        {/* {error && <p className="text-red-500">{error.message}</p>} */}
        {noProductosMessage}
      </div>
    </Layout>
  );
}