import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { LocalGuard } from './application/guards/local.guard';
import { LoginRequestDTO } from './application/use-cases/validate-user-use-case/dto/auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalGuard)
  async login(@Body() params: LoginRequestDTO) {
    return await this.authService.validateUser(params);
  }
}
