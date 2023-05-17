import { DetalleComprobante } from "./DetalleComprobante";

export interface Comprobante {
  id?: number;
  fecha?: string;
  fechaVencimiento?: string;
  numeroFactura?: number;
  idUsuario?: number;
  idEstado?: number;
  estadoFactura?: string;
  detalleComprobante: DetalleComprobante[];
  message?: string;
  init_point?: string;

}