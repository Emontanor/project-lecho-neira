import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthGuard } from './auth.guard';
import { Rental, RentalSchema } from './schemas/rental.schema';


const uri = "mongodb+srv://FhernandezM:234kAzLGdCWfO6WK@lechoneira.dmozf.mongodb.net/LechoNeira?retryWrites=true&w=majority&appName=LechoNeira"

@Module({
  imports: [
    MongooseModule.forRoot(uri),
    MongooseModule.forFeature([
      {
        name: Rental.name,
        schema: RentalSchema,
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