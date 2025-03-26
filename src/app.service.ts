import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken'; 
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Rental } from './schemas/rental.schema';
import { RentalDto } from './domains/rental.dto';

@Injectable()
export class AppService {

  private readonly validSignature = "lechoneira";

  constructor(
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
  
}