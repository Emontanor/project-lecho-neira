import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Productos } from './schemas/productos.schema';
import { Venta } from './schemas/venta.schema';
import { throwError } from 'rxjs';

@Injectable()
export class AppService {

  constructor(
    @InjectModel(Productos.name) private productosModel: Model<Productos>,
    @InjectModel(Venta.name) private ventaModel: Model<Venta>
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async getProducto(codigo: number): Promise<Productos | null> {
    try {
      console.log("Buscando producto con codigo: ", codigo);
      const producto = await this.productosModel.findOne({"codigo": Number(codigo)}).exec();
      // console.log("Producto encontrado: ", producto);
      if(!producto){
        throw new Error('Producto no encontrado');
      }
      return producto;
    } catch (error) {
      console.error("Error en getProducto: ", error);
      return null;
    }
  }
}
