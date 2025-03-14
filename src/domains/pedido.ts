import { Producto } from "src/schemas/productos.schema";

export interface Pedido {
    codigo: number;
    nombre: string;
    precio: number;
    cantidad: number;
}