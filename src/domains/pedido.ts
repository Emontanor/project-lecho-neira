import { Producto } from "src/schemas/productos.schema";

export interface Pedido {
    codigo: Number;
    nombre: string;
    precio: Number;
    cantidad: number;
}