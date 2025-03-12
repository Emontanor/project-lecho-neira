import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Producto extends Document{
    @Prop({required: true, unique: true})
    codigo: number;  //codigo unico del producto

    @Prop({required: false})
    nombre: string;  //nombre del producto

    @Prop({required: false})
    precio: number;  //precio del producto

    @Prop({required: false})
    existenciasLocal1: number;  //cantidad del producto en existencia en el local 1

    @Prop({required: false})
    existenciasLocal2: number;  //cantidad del producto en existencia en el local 2ç

    @Prop({required: false})
    imageUrl: string;  //url de la imagen del producto
}
export const ProductoSchema = SchemaFactory.createForClass(Producto);