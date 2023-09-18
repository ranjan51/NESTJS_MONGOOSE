
import { Injectable } from '@nestjs/common';
import { JwtService as jwtService } from '@nestjs/jwt';

@Injectable()
export class MyJwtService 
{

  constructor(private readonly jwtService: jwtService) {}
//genrate token
  generateToken(payload: any) {
    return this.jwtService.sign(payload);
  }
}