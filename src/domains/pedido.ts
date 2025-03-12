import { ObjectId } from "mongodb";

export interface Pedido {
    id_producto: ObjectId;
    cantidad: Number;
}