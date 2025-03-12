import { Controller, Get, Post, Param, Put, Body, Query} from '@nestjs/common';
import { AppService } from './app.service';
import { Producto } from './schemas/productos.schema';
import { ProductoDto } from './domains/producto.dto';
import { Locals } from './domains/locals';
import { Venta } from './schemas/venta.schema';
import { Pedido } from './domains/pedido';
import { PedidoDto } from './domains/pedido.dto';
import { MetodoPago } from './domains/metodosPago';



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

  @Post("/venta")
  async crearVenta(@Body() pedidosDto: PedidoDto[],@Query("localCode") localCode:string,@Query("matodoPago") metodoPago:string): Promise<Venta> {
    try{
      const pedidos: Pedido[] = await this.appService.convertirPedidoDtoAPedido(pedidosDto);
      const venta = await this.appService.crearVenta(pedidos,parseInt(localCode) as Locals,parseInt(metodoPago) as MetodoPago);
      console.log("Venta creada:", venta);
      return venta;
    }
    catch (error){
      console.error("Error en el controlador:", error);
      throw error;
    }
  }

  @Put("/producto")
  async actualizaProducto(@Body() productoDto: ProductoDto): Promise<Producto> {
    try {
      const productoDto: ProductoDto = {
        codigo: 4,
        nombre: "Producto actualizado",
        existenciasLocal2: 10
      }
      const productoActualizado = await this.appService.actualizarProducto(productoDto);
      return productoActualizado;
    } catch (error) {
      console.error("Error en el controlador:", error);
      throw error;
    }
  }

}