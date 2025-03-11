import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Producto extends Document {
    @Prop({required: true, unique: true})
    codigo: number;  //codigo unico del producto

    @Prop({required: true})
    nombre: string;  //nombre del producto

    @Prop({required: true})
    existencias: number;  //cantidad del producto en existencia
}

export const ProductoSchema = SchemaFactory.createForClass(Producto);