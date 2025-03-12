import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Pedido } from '../domains/pedido';

@Schema()
export class Venta extends Document{
    @Prop({required: true})
    pedidos: Pedido[];  //lista de pedidos

    @Prop({required: true})
    total: number;  //costo total de la venta

    @Prop({required: true})
    fecha: Date;  //fecha de la venta
}

export const VentaSchema = SchemaFactory.createForClass(Venta);