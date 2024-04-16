import { LocalGuard } from '@modules/auth/domain/guards';
import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { IsPublic } from '../decorators/is-public.decorator';

@Controller('auth')
export class AuthController {
  constructor() {}

  @IsPublic()
  @Post('/login')
  @UseGuards(LocalGuard)
  async login(@Req() req: Request) {
    return req.user;
  }
}
