import { useEffect, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/router"
import Layout from "@/components/Layout/Layout"
import { useAppSelector, useAppDispatch } from "@/hooks/useReduxStore"
import { getProductAsync } from "@/store/features/product/productsSlice"

interface ProductState {
  quantity: number;
}

export default function Producto() {
  const router = useRouter()
  const { id } = router.query
  const { producto, loading, error } = useAppSelector(state => state.productos)
  const dispatch = useAppDispatch()
  const [quantity, setQuantity] = useState<ProductState['quantity']>(1);

  const { nombre, descripcion, precioVenta, stock, urlImagen, categoria, subcategoria } = producto

  useEffect(() => {
    dispatch(getProductAsync(Number(id)))
  }, [id, dispatch])
  

  const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = parseInt(e.target.value);
    setQuantity(value);
  };

  const options = [];
  for (let i = 1; i <= stock; i++) {
    options.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }

  return (
    <Layout title={nombre}>
      <div className="mx-auto w-5/6">
        <p className="mt-5 font-extralight text-grisClaro">
          Productos {'>'} {categoria?.nombre} {'>'} {subcategoria?.nombre}
        </p>
        <div className="my-20">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2">
              <Image src={urlImagen} alt={nombre} width={500} height={500} />
            </div>
            <div className="w-full md:w-1/2">
              <h3 className="text-2xl font-bold text-grisOscuro my-5">{nombre}</h3>
              <p className="text-grisOscuro">{descripcion}</p>
              <p className="text-grisOscuro font-extrabold mt-6 text-xl">Precio: <span className="font-normal">${precioVenta}</span></p>
              <div className="flex flex-col">
                <div className="w-full md:w-1/2">
                  <select
                    className="w-full border border-grisClaro rounded-md p-2 my-2"
                    value={quantity}
                    onChange={handleQuantityChange}
                  >
                    {options}
                  </select>
                </div>
                <div className="w-full md:w-1/2">
                  <button className="bg-grisMedio text-blanco rounded-md p-2 my-2 w-full hover:bg-verde transition-colors ease-in-out duration-300">
                    Agregar al carrito
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
