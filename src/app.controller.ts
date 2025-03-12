import { Controller, Get, Post, Param, Put, Body, Query} from '@nestjs/common';
import { AppService } from './app.service';
import { Producto } from './schemas/productos.schema';
import { ProductoDto } from './domains/producto.dto';
import { Locals } from './domains/locals';



@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  
  @Get("/producto")
  async obtenerProductoPrueba(@Query("localCode") localCode: string): Promise<Producto[]> {
    try {
      const localCodeEnum = parseInt(localCode) as Locals;
      const productos = await this.appService.obtenerProductosPrueba(localCodeEnum);
      return productos;
    } catch (error) {
      console.error("Error en el controlador:", error);
      throw error;
    }
  }

  @Post("/producto")
  async crearProductoPrueba(@Body() productoDto: ProductoDto): Promise<Producto> {
    try {
      const producto = await this.appService.crearProductoPrueba(productoDto);
      console.log("Producto creado:", producto);
      return producto;
    }
    catch (error) { 
      console.error("Error en el controlador:", error);
      throw error;
    } 
  }

}