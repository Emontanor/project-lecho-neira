import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Producto } from './schemas/productos.schema';
import { Venta } from './schemas/venta.schema';
import { ProductoDto } from './domains/producto.dto';
import { Locals } from './domains/locals';

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

  obtenerProductosPrueba = async(localCode: Locals): Promise<Producto[]> => {
    try {
      let lista: Producto[] = [];
      console.log("LocalCode:", localCode);
      if(localCode === Locals.LOCAL_15){
        console.log("Local 15");
        lista = await this.productoRepository.find({ existenciasLocal1: { $gt: 0 } }).exec();
      }
      else{
        console.log("Local 16");
        lista = await this.productoRepository.find({ existenciasLocal2: { $gt: 0 } }).exec();
      }
      return lista;
    } catch (error) {
      console.error("Error en la consulta:", error);
      throw error;
    }
  }

  crearProductoPrueba = async(productoDto: ProductoDto): Promise<Producto> => {
    try {
      const producto = new this.productoRepository(productoDto);
      const productoGuardado = await producto.save();
      return productoGuardado;
    } catch (error) {
      console.error("Error en la creación:", error);
      throw error;
    }
  } 
   
}