import { Controller, Get, Post, Param, Put, Body, Query, Delete, Headers, UnauthorizedException} from '@nestjs/common';
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
  async getHello(): Promise<String>{
    return this.appService.getHello();
  }
  
  @Get("/producto")
  async obtenerProductos(@Query("localCode") localCode: string): Promise<Producto[]> {
    try {
      const localCodeEnum = parseInt(localCode) as Locals;
      const productos = await this.appService.obtenerProductos(localCodeEnum);
      return productos;
    } catch (error) {
      console.error("Error en el controlador:", error);
      throw error;
    }
  }

  @Post("/producto")
  async crearProducto(@Body() productoDto: ProductoDto): Promise<Producto> {
    try {
      const producto = await this.appService.crearProducto(productoDto);
      console.log("Producto creado:", producto);
      return producto;
    }
    catch (error) { 
      console.error("Error en el controlador:", error);
      throw error;
    } 
  }

  @Put("/producto")
  async actualizarProducto(@Body() productoDto: ProductoDto): Promise<Producto> {
    try {
      const productoActualizado = await this.appService.actualizarProducto(productoDto);
      return productoActualizado;
    } catch (error) {
      console.error("Error en el controlador:", error);
      throw error;
    }
  }

  @Delete("/producto")
  async eliminarProducto(@Query("codigo") codigo: string): Promise<Producto> {
    try {
      const productoEliminado = await this.appService.eliminarProducto(parseInt(codigo));
      return productoEliminado;
    } catch (error) {
      console.error("Error en el controlador:", error);
      throw error;
    }
  }

  @Get("/venta")
  async obtenerVentas(@Query("localCode") localCode: string): Promise<Venta[]> {
    try {
      const localCodeEnum = parseInt(localCode) as Locals;
      const ventas = await this.appService.obtenerVentas(localCodeEnum);
      return ventas;
    } catch (error) {
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

}