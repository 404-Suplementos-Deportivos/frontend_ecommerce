import Image from "next/image"
import { Radio, Input } from "@nextui-org/react"
import Layout from "@/components/Layout/Layout"
import CheckoutListDesktop from "@/components/Products/CheckoutListDesktop"
import CheckoutListMobile from "@/components/Products/CheckoutListMobile"
import { CreditCardIcon, BanknotesIcon, QrCodeIcon, BuildingLibraryIcon } from "@heroicons/react/24/outline"
import { useIsSmallScreen } from "@/hooks/useIsSmallScreen"
import { useAppSelector, useAppDispatch} from "@/hooks/useReduxStore"
import { getYears, getMonths } from "@/libs/helpers"

export default function Checkout() {
  const isSmallScreen = useIsSmallScreen(768)
  const { items } = useAppSelector(state => state.cart)
  const dispatch = useAppDispatch()

  // TODO: https://www.youtube.com/watch?v=639oxmuZZQY - https://www.youtube.com/results?search_query=sticky+sidebar+react
  return (
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
                />
                <Input 
                  aria-label="state2"
                  name="state2"
                  underlined 
                  color="default"
                  type="number"
                  maxLength={4}
                  minLength={4}
                />
                <Input 
                  aria-label="state3"
                  name="state3"
                  underlined 
                  color="default"
                  type="number"
                  maxLength={4}
                  minLength={4}
                />
                <Input 
                  aria-label="state4"
                  name="state4"
                  underlined 
                  color="default"
                  type="number"
                  maxLength={4}
                  minLength={4}
                />
              </div>
            </div>
            <div className="w-full flex flex-col md:flex-row gap-2">
              <div className="w-full flex flex-col justify-between">
                <p className="font-bold text-grisClaro/60 mt-4 mb-2 text-sm">Fecha de Expiración</p>
                <div className="flex flex-row gap-2">
                  <select className="w-full text-center border-b border-grisClaro/50 transition-colors duration-300 focus:border-b-negro focus:outline-none ">
                    {getMonths.map((month, index) => (
                      <option key={index} value={index}>{month}</option>
                    ))}
                  </select>
                  <select className="w-full text-center border-b border-grisClaro/50 transition-colors duration-300 focus:border-b-negro focus:outline-none">
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
                />
              </div>
            </div>
            <button
              className='bg-grisClaro text-blanco py-4 px-6 text-center block w-full mt-8 transition-colors duration-300 ease-in-out hover:bg-amarillo'
            >
              Realizar pedido
            </button>
          </div>
        </aside>
      </div>
    </Layout>
  )
}
