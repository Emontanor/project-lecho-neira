import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Producto } from './schemas/productos.schema';
import { Venta } from './schemas/venta.schema';

@Injectable()
export class AppService {

  constructor(
    @InjectModel(Producto.name)
    private readonly productoModel: Model<Producto>,
    @InjectModel(Venta.name)
    private readonly ventaModel: Model<Venta>,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async obtenerProductosPrueba(): Promise<Producto[] | null> {
    console.log("Obteniendo productos de prueba desde Service");
    try {
      const lista: Producto[] = await this.productoModel.find().exec();
      console.log("Consulta ejecutada, resultado:", lista);
      return lista;
    } catch (error) {
      console.error("Error en la consulta:", error);
      return null;
    }
  }

  async crearProductoPrueba(): Promise<Producto | null> {
    console.log("Creando producto de prueba desde Service");
    try {
      const producto = new this.productoModel({
        codigo: 10,
        nombre: "Producto de prueba",
        precio: 100,
        existencias: 8
      });
      const productoGuardado = await producto.save();
      console.log("Producto guardado:", productoGuardado);
      return productoGuardado;
    } catch (error) {
      console.error("Error en la creación:", error);
      return null;
    }
  }  

}