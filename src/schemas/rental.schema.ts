import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Rental extends Document{

    @Prop({required: false})
    name: string;  //nombre del producto

    @Prop({required: false})
    phone: number;  //precio del producto

    @Prop({required: false})
    amount: number;  //cantidad del producto en existencia en el local 1

}
export const RentalSchema = SchemaFactory.createForClass(Rental);