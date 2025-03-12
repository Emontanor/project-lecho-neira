import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Producto } from './schemas/productos.schema';
import { Venta } from './schemas/venta.schema';
import { ProductoDto } from './domains/producto.dto';

@Injectable()
export class AppService {

  constructor(
    @InjectModel(Producto.name)
    private readonly productoRepository: Model<Producto>,
    @InjectModel(Venta.name)
    private readonly ventaRepository: Model<Venta>,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async obtenerProductosPrueba(): Promise<Producto[] | null> {
    console.log("Obteniendo productos de prueba desde Service");
    try {
      const lista: Producto[] = await this.productoRepository.find().exec();
      console.log("Consulta ejecutada, resultado:", lista);
      return lista;
    } catch (error) {
      console.error("Error en la consulta:", error);
      return null;
    }
  }

  crearProductoPrueba = async(productoDto: ProductoDto): Promise<Producto> => {
    console.log("Creando producto de prueba desde Service");
    try {
      const producto = new this.productoRepository(productoDto);
      const productoGuardado = await producto.save();
      console.log("Producto guardado:", productoGuardado);
      return productoGuardado;
    } catch (error) {
      console.error("Error en la creación:", error);
      throw error;
    }
  } 
   
}