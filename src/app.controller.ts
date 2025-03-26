import { Controller, Get, Post, Param, Put, Body, Query, Delete, Headers, UnauthorizedException} from '@nestjs/common';
import { AppService } from './app.service';
import { Rental } from './schemas/rental.schema';
import { RentalDto } from './domains/rental.dto';
import { Public } from './decorators/public.decorator';



@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Public()
  async getHealth(): Promise<String>{
    return this.appService.getHealth();
  }

  
  @Get("/rental")
  async getAllRentals(): Promise<Rental[]> {
    try {
      const rentals = await this.appService.getAllRentals();
      return rentals;
    } catch (error) {
      console.error("Error en el controlador:", error);
      throw error;
    }
  }

  @Get("/rental/:Phone")
  async getRentalByPhoneNumber(@Param("Phone") phone: number): Promise<Rental[]> {
    try {
      const rentals = await this.appService.getRentalByPhoneNumber(phone);
      return rentals;
    } catch (error) {
      console.error("Error en el controlador:", error);
      throw error;
    }
  }

  @Post("/rental")
  async createRental(@Body() rentalDto: RentalDto): Promise<Rental> {
    try {
      const rentalCreated = await this.appService.createRental(rentalDto);
      return rentalCreated;
    } catch (error) {
      console.error("Error en el controlador:", error);
      throw error;
    }
  }

  @Put("/rental")
  async updateRental(@Body() rentalDto: RentalDto,@Query("_id") id: string): Promise<Rental> {
    try {
      const rentalUpdated = await this.appService.updateRental(rentalDto, id);
      return rentalUpdated;
    } catch (error) {
      console.error("Error en el controlador:", error);
      throw error;
    }
  }

  @Delete("/rental")
  async deleteRental(@Query("_id") id:string): Promise<Rental> {
    try {
      const rentalDeleted = await this.appService.deleteRental(id);
      return rentalDeleted;
    } catch (error) {
      console.error("Error en el controlador:", error);
      throw error;
    }
  }

}