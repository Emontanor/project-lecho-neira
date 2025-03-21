import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AppService } from './app.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly appService: AppService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      throw new UnauthorizedException('Token is missing');
    }

    const isValid = await this.appService.validarToken(token);
    if (!isValid) {
      throw new UnauthorizedException('Invalid token');
    }

    return true;
  }
  
}