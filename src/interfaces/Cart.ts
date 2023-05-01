import { Producto } from "./Producto";

export interface Cart {
  id: number;
  idUsuario: number;
  productos: Producto[];
}