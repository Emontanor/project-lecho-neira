import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import {Producto,ProductoSchema} from './schemas/producto.schema';
import {Venta,VentaSchema} from './schemas/venta.schema';

import * as dotenv from 'dotenv';

dotenv.config();

const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
  throw new Error('❌ ERROR: La variable de entorno MONGO_URI no está definida.');
}
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true,envFilePath:'.env',}),MongooseModule.forRoot(mongoUri),
    MongooseModule.forFeature([{ name: Producto.name, schema: ProductoSchema },{ name: Venta.name, schema: VentaSchema }]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
