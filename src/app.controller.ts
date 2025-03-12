import { Controller, Get, Post, Param, Put, Body} from '@nestjs/common';
import { AppService } from './app.service';
import { Producto } from './schemas/productos.schema';
import { Venta } from './schemas/venta.schema';
import { ProductoDto } from './domains/producto.dto';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  
  @Get("/producto")
  async obtenerProductoPrueba(@Body() productoDto: ProductoDto): Promise<Producto[] | null> {
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