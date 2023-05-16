import { useEffect } from "react"
import { useRouter } from "next/router"
import { Radio, Input } from "@nextui-org/react"
import Layout from "@/components/Layout/Layout"
import Loader from "@/components/Layout/Navbar/Loader"
import CheckoutListDesktop from "@/components/Products/CheckoutListDesktop"
import CheckoutListMobile from "@/components/Products/CheckoutListMobile"
import { CreditCardIcon, BanknotesIcon, QrCodeIcon, BuildingLibraryIcon } from "@heroicons/react/24/outline"
import { useIsSmallScreen } from "@/hooks/useIsSmallScreen"
import { useAppSelector, useAppDispatch } from "@/hooks/useReduxStore"
import { useProtectedRoute } from "@/hooks/useProtectedRoute"
import { createComprobanteAsync } from "@/store/features/billing/billingSlice"
import { showToast } from "@/store/features/design/designSlice"
import { Comprobante } from "@/interfaces/Comprobante"
import { DetalleComprobante } from "@/interfaces/DetalleComprobante"
import { getYears, getMonths } from "@/libs/helpers"

export default function Checkout() {
  const isSmallScreen = useIsSmallScreen(768)
  const { items } = useAppSelector(state => state.cart)
  const { loading: loadingUser } = useAppSelector(state => state.user)
  const { isAuth, loading: loadingAuth } = useAppSelector(state => state.auth) 
  const { comprobante, error } = useAppSelector(state => state.billing)
  const dispatch = useAppDispatch()
  const router = useRouter()

  useProtectedRoute()

  useEffect(() => {
    if(comprobante.message) {
      dispatch(showToast({
        type: 'success',
        message: comprobante.message
      }))
      setTimeout(() => {
        router.push(comprobante.init_point as string)
      }, 2000)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [comprobante])

  const realizarPedido = async () => {
    const pedido: DetalleComprobante[] = items.map(item => {
      return {
        cantidad: item.cantidad as number,
        precio: item.precioVenta as number,
        descuento: 0 as number,
        idProducto: item.id as number,
        nombreProducto: item.nombre as string
      }
    })

    const detalle: Comprobante = {
      detalleComprobante: pedido
    }

    await dispatch(createComprobanteAsync(detalle))
    
  }

  return (
    !loadingUser && !loadingAuth && isAuth ? (
      <Layout
        title="Checkout"
      >
        <div className="mx-auto w-5/6 md:grid md:grid-cols-3 xl:grid-cols-4 my-6 mb-12 gap-12">
          <div className="md:col-span-2 xl:col-span-3">
            <h3 className="font-bold text-2xl">Resumen de Compra</h3>
            {items.length ? (
              isSmallScreen ? (
                // Mobile
                <CheckoutListMobile />
              ) : (
                // Desktop
                <CheckoutListDesktop />
              )
            ) : (
              <div className="my-4 flex flex-col items-center">
                <p className="text-2xl">No hay productos en el carrito</p>
              </div>
            )}
          </div>
          <aside className="md:col-span-1 xl:col-span-1 mt-10 md:mt-0 md:sticky md:top-24 md:h-fit">
            <h3 className="font-bold text-2xl">Información de Pago</h3>
            <div className="mt-4">
              <div>
                <p className="font-bold text-grisClaro/60">Método de Pago</p>
                <Radio.Group defaultValue="mercadopago" orientation="horizontal" aria-label="metodoPago" name="metodoPago">
                  <div className="mt-2 flex flex-col gap-4">
                    <Radio value="mercadopago" color="success">
                      <CreditCardIcon className="h-5 w-5 mr-2" />
                      <p className="font-light">MercadoPago</p>
                    </Radio>
                    <Radio value="efectivo" color="success" isDisabled>
                      <BanknotesIcon className="h-5 w-5 mr-2" />
                      <p className="font-light">Efectivo (Próximamente)</p>
                    </Radio>
                    <Radio value="transferencia" color="success" isDisabled>
                      <BuildingLibraryIcon className="h-5 w-5 mr-2" />
                      <p className="font-light">Transferencia (Próximamente)</p>
                    </Radio>
                    <Radio value="qr" color="success" isDisabled>
                      <QrCodeIcon className="h-5 w-5 mr-2" />
                      <p className="font-light">QR (Próximamente)</p>
                    </Radio>
                  </div>
                </Radio.Group>
              </div>
              <div>
                <p className="font-bold text-grisClaro/60 mt-4">Nombre en tarjeta</p>
                <Input 
                  aria-label="nameCard"
                  name="nameCard"
                  underlined 
                  color="default" 
                  fullWidth
                  disabled
                />
              </div>
              <div>
                <p className="font-bold text-grisClaro/60 mt-4">Número de tarjeta</p>
                <div className="flex flex-row gap-2">
                  <Input 
                    aria-label="state1"
                    name="state1"
                    underlined 
                    color="default"
                    type="number"
                    maxLength={4}
                    minLength={4}
                    disabled
                  />
                  <Input 
                    aria-label="state2"
                    name="state2"
                    underlined 
                    color="default"
                    type="number"
                    maxLength={4}
                    minLength={4}
                    disabled
                  />
                  <Input 
                    aria-label="state3"
                    name="state3"
                    underlined 
                    color="default"
                    type="number"
                    maxLength={4}
                    minLength={4}
                    disabled
                  />
                  <Input 
                    aria-label="state4"
                    name="state4"
                    underlined 
                    color="default"
                    type="number"
                    maxLength={4}
                    minLength={4}
                    disabled
                  />
                </div>
              </div>
              <div className="w-full flex flex-col md:flex-row gap-2">
                <div className="w-full flex flex-col justify-between">
                  <p className="font-bold text-grisClaro/60 mt-4 mb-2 text-sm">Fecha de Expiración</p>
                  <div className="flex flex-row gap-2">
                    <select className="w-full bg-grisMuyClaro text-center border-b border-grisClaro/50 transition-colors duration-300 focus:border-b-negro focus:outline-none" disabled>
                      {getMonths.map((month, index) => (
                        <option key={index} value={index}>{month}</option>
                      ))}
                    </select>
                    <select className="w-full bg-grisMuyClaro text-center border-b border-grisClaro/50 transition-colors duration-300 focus:border-b-negro focus:outline-none" disabled>
                      {getYears.map((year, index) => (
                        <option key={index} value={index}>{year}</option>
                      ))}
                    </select>
                  </div>
                </div>                
                <div className="w-full  flex flex-col justify-between">
                  <p className="font-bold text-grisClaro/60 mt-4 text-sm">CVV</p>
                  <Input 
                    aria-label="cvv"
                    name="cvv"
                    underlined 
                    color="default" 
                    type="number"
                    disabled
                  />
                </div>
              </div>
              <button
                className='bg-grisClaro text-blanco py-4 px-6 text-center block w-full mt-8 transition-colors duration-300 ease-in-out hover:bg-amarillo'
                onClick={realizarPedido}
              >
                Realizar pedido
              </button>
            </div>
          </aside>
        </div>
      </Layout>
    ) : (
      <Layout title="Checkout">
        <Loader />
      </Layout>
    )
  )
}
