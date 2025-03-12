import { Controller, Get, Post, Param, Put} from '@nestjs/common';
import { AppService } from './app.service';
import { Producto } from './schemas/productos.schema';
import { Venta } from './schemas/venta.schema';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  
  @Post("/producto")
  async obtenerProductoPrueba(): Promise<Producto[] | null> {
    try {
      console.log("Obteniendo productos de prueba desde Controller");
      const productos = await this.appService.obtenerProductosPrueba();
      console.log("Productos obtenidos:", productos);
      return productos;
    } catch (error) {
      console.error("Error en el controlador:", error);
      return null;
    }
  }

  @Put("/producto")
  async crearProductoPrueba(): Promise<Producto | null> {
    console.log("Creando producto de prueba desde Controller");
    try {
      const producto = await this.appService.crearProductoPrueba();
      console.log("Producto creado:", producto);
      return producto;
    }
    catch (error) { 
      console.error("Error en el controlador:", error);
      return null;
    } 
  }

}