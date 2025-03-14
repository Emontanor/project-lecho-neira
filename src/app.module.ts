import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Producto, ProductoSchema } from './schemas/productos.schema';
import { Venta, VentaSchema } from './schemas/venta.schema';
import { AuthGuard } from './auth.guard';


const uri = "mongodb+srv://FhernandezM:234kAzLGdCWfO6WK@lechoneira.dmozf.mongodb.net/LechoNeira?retryWrites=true&w=majority&appName=LechoNeira"

@Module({
  imports: [
    MongooseModule.forRoot(uri),
    MongooseModule.forFeature([
      {
        name: Producto.name,
        schema: ProductoSchema,
      }
    ]),
    MongooseModule.forFeature([
      {
        name: Venta.name,
        schema: VentaSchema,
      }
    ]),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'APP_GUARD',
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}