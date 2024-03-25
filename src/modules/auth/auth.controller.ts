import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { LocalGuard } from './application/guards/local/local.guard';
import { AuthService } from './auth.service';
import { IsPublic } from './application/utils/is-public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPublic()
  @Post('/login')
  @UseGuards(LocalGuard)
  async login(@Req() req: Request) {
    return req.user;
  }
}
