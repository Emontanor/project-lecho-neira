import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Producto extends Document{
    @Prop({required: true, unique: true})
    codigo: number;  //codigo unico del producto

    @Prop({required: true})
    nombre: string;  //nombre del producto

    @Prop({required: true})
    precio: number;  //precio del producto

    @Prop({required: true})
    existenciasLocal1: number;  //cantidad del producto en existencia en el local 1

    @Prop({required: true})
    existenciasLocal2: number;  //cantidad del producto en existencia en el local 2ç

    @Prop({required: false})
    imageUrl: string;  //url de la imagen del producto
}
export const ProductoSchema = SchemaFactory.createForClass(Producto);