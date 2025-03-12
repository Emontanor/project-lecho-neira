import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Venta extends Document{
    @Prop({required: true})
    productos: Map<string,number>;  //lista de productos <producto,cantidad>

    @Prop({required: true})
    total: number;  //costo total de la venta

    @Prop({required: true})
    fecha: Date;  //fecha de la venta
}

export const VentaSchema = SchemaFactory.createForClass(Venta);