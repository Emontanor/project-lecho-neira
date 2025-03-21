import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken'; 
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Producto } from './schemas/productos.schema';
import { Venta } from './schemas/venta.schema';
import { ProductoDto } from './domains/producto.dto';
import { Locals } from './domains/locals';
import { Pedido } from './domains/pedido';
import { PedidoDto } from './domains/pedido.dto';
import { async } from 'rxjs';
import { MetodoPago } from './domains/metodosPago';
import { Rental } from './schemas/rental.schema';
import { RentalDto } from './domains/rental.dto';

@Injectable()
export class AppService {

  private readonly validSignature = "lechoneira";

  constructor(
    @InjectModel(Producto.name)
    private readonly productoRepository: Model<Producto>,
    @InjectModel(Venta.name)
    private readonly ventaRepository: Model<Venta>,
    @InjectModel(Rental.name)
    private readonly rentalRepository: Model<Rental>,
  ) {}


  validarToken = async(token: string): Promise<boolean> => {
    try{
      const decoded = jwt.verify(token, this.validSignature, {algorithms:["HS256"]});
      return !!decoded;
    }catch(error){
      console.error("Error en el servicio:", error);
      return false;
    } 
  }


  getHealth(): string {
    return 'Heatlh';
  }


  getAllRentals = async(): Promise<Rental[]> => {
    try {
      const rentals = await this.rentalRepository.find().exec();
      return rentals;
    } catch (error) {
      console.error("Error en la consulta:", error);
      throw error;
    }
  }

  getRentalByPhoneNumber = async(phone: number): Promise<Rental[]> => {
    try {
      const rentals = await this.rentalRepository.find({ phone: phone }).exec();
      return rentals;
    } catch (error) {
      console.error("Error en la consulta:", error);
      throw error;
    }
  }

  createRental = async(rentalDto: RentalDto): Promise<Rental> => {
    try {
      const rental = new this.rentalRepository(rentalDto);
      const rentalGuardado = await rental.save();
      return rentalGuardado;
    } catch (error) {
      console.error("Error en la creación:", error);
      throw error;
    }
  }

  updateRental = async(rentalDto: RentalDto, id: string): Promise<Rental> => {
    try {
      const rentalExistente = await this.rentalRepository.findById(id).exec();
        if (!rentalExistente) {
          throw new Error(`Rental con _id ${id} no encontrado`);
        }
      const rental = new this.rentalRepository(rentalDto);
      if(rental.name !== undefined){
        await this.rentalRepository.updateOne(
          { _id: id },
          { $set: { name: rental.name } }
        ).exec();
      }
      if(rental.phone !== undefined){
        await this.rentalRepository.updateOne(
          { _id: id },
          { $set: { phone: rental.phone } }
        ).exec();
      }
      if(rental.amount !== undefined){
        await this.rentalRepository.updateOne(
          { _id: id },
          { $set: { amount: rental.amount } }
        ).exec();
      }

      const rentalActualizado = await this.rentalRepository.findById(id).exec();
      if(!rentalActualizado){
        throw new Error('Rental no encontrado');
      }
      return rentalActualizado;
    }
    catch(error){
      console.error("Error en el servicio:", error);
      throw error;
    }
  }

  deleteRental = async(id: string): Promise<Rental> => {
    try {
      const rentalEliminado = await this.rentalRepository.findByIdAndDelete(id).exec();
      if (!rentalEliminado) {
        throw new Error('Rental no encontrado');
      }
      return rentalEliminado;
    } catch (error) {
      console.error("Error en el servicio:", error);
      throw error
    }
  } 


  obtenerProductos = async(localCode: Locals): Promise<Producto[]> => {
    try {
      let lista: Producto[] = [];
      if(localCode === Locals.LOCAL_15){
        lista = await this.productoRepository.find({ existenciasLocal1: { $gt: 0 } }).exec();
      }
      else{
        lista = await this.productoRepository.find({ existenciasLocal2: { $gt: 0 } }).exec();
      }
      return lista;
    } catch (error) {
      console.error("Error en la consulta:", error);
      throw error;
    }
  }

  crearProducto = async(productoDto: ProductoDto): Promise<Producto> => {
    try {
      const producto = new this.productoRepository(productoDto);
      const productoGuardado = await producto.save();
      return productoGuardado;
    } catch (error) {
      console.error("Error en la creación:", error);
      throw error;
    }
  }
  
  actualizarProducto = async(productoDto: ProductoDto): Promise<Producto> => {
    try {
      const producto = new this.productoRepository(productoDto);
      if(producto.nombre !== undefined){
        await this.productoRepository.updateOne(
          { codigo: producto.codigo },
          { $set: { nombre: producto.nombre } }
        ).exec();
      }
      if(producto.precio !== undefined){
        await this.productoRepository.updateOne(
          { codigo: producto.codigo },
          { $set: { precio: producto.precio } }
        ).exec();
      }
      if(producto.existenciasLocal1 !== undefined){
        await this.productoRepository.updateOne(
          { codigo: producto.codigo },
          { $set: { existenciasLocal1: producto.existenciasLocal1 } }
        ).exec();
      }
      if(producto.existenciasLocal2 !== undefined){
        await this.productoRepository.updateOne(
          { codigo: producto.codigo },
          { $set: { existenciasLocal2: producto.existenciasLocal2 } }
        ).exec();
      }
      if(producto.imageUrl !== undefined){
        await this.productoRepository.updateOne(
          { codigo: producto.codigo },
          { $set: { imageUrl: producto.imageUrl } }
        ).exec();
      }
      const productoActualizado = await this.productoRepository.findOne({ codigo: producto.codigo }).exec();
      if(!productoActualizado){
        throw new Error('Producto no encontrado');
      }
      return productoActualizado;
    } catch (error) {
      console.error("Error en el servicio:", error);
      throw error;
    }
  }

  eliminarProducto = async(codigo: number): Promise<Producto> => {
    try {
      const productoEliminado = await this.productoRepository.findOneAndDelete({ codigo: codigo }).exec();
      if (!productoEliminado) {
        throw new Error('Producto no encontrado');
      }
      return productoEliminado;
    } catch (error) {
      console.error("Error en el servicio:", error);
      throw error;
    }
  }

  
  obtenerVentas = async(localCode: Locals): Promise<Venta[]> => {
    try {
      let lista: Venta[] = [];
      if(localCode === Locals.LOCAL_15){
        lista = await this.ventaRepository.find({ local: 1 }).exec();
      }
      else{
        lista = await this.ventaRepository.find({ local: 2}).exec();
      }
      return lista;
    } catch (error) {
      console.error("Error en la consulta:", error);
      throw error;
    }
  }

  crearVenta = async(pedidos: Pedido[],localCode: Locals, metodoPago: MetodoPago): Promise<Venta> => {
    try{
      let total: number = 0;
      for (const pedido of pedidos) {
        const producto = await this.productoRepository.findOne({ codigo: pedido.codigo }).exec();
        if (producto) {
          console.log(`Precio del producto con código ${pedido.codigo}: ${producto.precio}`);
          if(localCode === Locals.LOCAL_15){
            await this.productoRepository.updateOne(
              { codigo: producto.codigo },
              { $inc: { existenciasLocal1: -pedido.cantidad } }
            )
          }else if(localCode === Locals.LOCAL_16){
            await this.productoRepository.updateOne(
              { codigo: producto.codigo },
              { $inc: { existenciasLocal2: -pedido.cantidad } }
            )
          }
          total += producto.precio * pedido.cantidad;
        }
      }
      const venta = new this.ventaRepository({ pedidos, total, local: localCode, metodoPago: metodoPago });
      const ventaGuardada = await venta.save();
      return ventaGuardada;     
    }
    catch(error){
      console.error("Error en el servicio:", error);
      throw error;
    }
  }

  convertirPedidoDtoAPedido = async(PedidosDto: PedidoDto[]): Promise<Pedido[]> => {
    try{
      let pedidos: Pedido[] = [];
      for(const pedidoDto of PedidosDto){
        const producto = await this.productoRepository.findOne({ codigo: pedidoDto.codigo }).exec();
        if(producto){
          const pedido: Pedido = {
            codigo: producto.codigo,
            nombre: producto.nombre,
            precio: producto.precio,
            cantidad: pedidoDto.cantidad
          };
          pedidos.push(pedido);
        }
      }
      return pedidos;
    }
    catch(error){
      console.error("Error en el servicio:", error);
      throw error;
    }
  }
  
}