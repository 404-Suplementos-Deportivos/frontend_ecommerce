import React from 'react'
import Image from 'next/image';
import { Collapse, Text } from "@nextui-org/react";
import { Comprobante } from '@/interfaces/Comprobante'

interface OrdersProps {
  comprobantes: Comprobante[]
}

const Orders = ({comprobantes}: OrdersProps) => {

  return (
    <Collapse.Group>
      {comprobantes.map((comprobante) => (
        <Collapse
          key={comprobante.id}
          title={
            <>
              Orden <Text b>#{comprobante.numeroFactura}</Text>
            </>
          }
          subtitle={
            <>
              <Text b>Estado: </Text> {comprobante.estadoFactura}
            </>
          }
        >
          <Text>
            {comprobante.detalleComprobante.map((detalle) => (
              <div key={detalle.id} className='flex flex-row justify-between pb-5 border-b border-b-grisClaro/60'>
                <div>
                  <Text b>{detalle.producto?.nombre}</Text>
                  <Image
                    src={detalle.producto?.urlImagen || ''}
                    alt={detalle.producto?.nombre || ''}
                    width={100}
                    height={100}
                    style={{ borderRadius: '50%' }}
                  />
                </div>
                <div>
                  <Text>
                    <Text b>Precio: </Text>
                    ${detalle.precio}
                  </Text>
                  <Text>
                    <Text b>Cantidad: </Text>
                    {detalle.cantidad}
                  </Text>
                  <Text>
                    <Text b>Subtotal: </Text>
                    ${detalle.precio * detalle.cantidad}
                  </Text>
                </div>
              </div>
            ))}
          </Text>
          <Text className='mt-3 text-2xl'>
            <Text b>Total: </Text>
            ${comprobante.detalleComprobante.reduce((acc, curr) => acc + (curr.precio * curr.cantidad), 0)}
          </Text>
        </Collapse>
      ))}
    </Collapse.Group>
  )
}

export default Orders