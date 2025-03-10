import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import * as mongoose from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config();

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  
  @Post('/conexion')
  async postPrueba(): Promise<boolean> {
    try {
      await mongoose.connect(process.env.MONGO_URI as string);

      console.log('📡 Conectado a MongoDB Atlas');
      return true;
    } catch (error) {
      console.error('❌ Error al conectar a MongoDB:', error);
      return false;
    }
  }
  
}

