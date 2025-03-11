import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Producto } from './schemas/producto.schema';
import { Venta } from './schemas/venta.schema';

@Injectable()
export class AppService {

  constructor(
    @InjectModel(Producto.name) private productoModel: Model<Producto>,
    @InjectModel(Venta.name) private ventaModel: Model<Venta>
  ) {}

  getHello(): string {
    return 'Hello World!';
  }
}
