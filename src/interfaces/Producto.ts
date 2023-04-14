import { Categoria } from "./Categoria"
import { Subcategoria } from "./Subcategoria"

export interface Producto {
  id?: number
  nombre: string
  descripcion: string
  urlImagen: string
  precioLista: number
  stock: number
  stockMinimo: number
  estado?: boolean
  idSubCategoria: number
  idCategoria: number
  categoria: Categoria
  subcategoria: Subcategoria
}