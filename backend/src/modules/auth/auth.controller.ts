import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { Request, UseFilters } from '@nestjs/common/decorators';
import { LoginUserReq, User } from 'src/models/user';
import { AuthService } from './auth.service';
import { LocalAuthGuard, ViewAuthFilter } from './local-auth.guards';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @UseFilters(ViewAuthFilter)
  @Post('/login')
  @HttpCode(200)
  async login(@Request() req: Request & LoginUserReq) {
    return this.authService.login(req.user);
  }

  @Post('/register')
  async register(@Body() dto: User): Promise<boolean> {
    return this.authService.register(dto);
  }
}
