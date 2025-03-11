import { Controller, Get, Post, Param} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("/productos/:codigo")
  async getProducto(@Param('codigo') codigo: string): Promise<any> {
    return this.appService.getProducto(Number(codigo));
  }
}