import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  LoginRequest,
  RefreshTokenRequest,
  TokenResponse,
} from '../models/auth';
import { NotRequireAuthentication } from 'src/decorators';
import { AuthService } from '../services/auth.service';

@Controller({
  path: ['/api/v1.0/auth'],
  version: ['1.0'],
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @NotRequireAuthentication()
  @HttpCode(HttpStatus.OK)
  async loginByProvider(@Body() data: LoginRequest): Promise<TokenResponse> {
    const profile: Record<string, string> = {
      userId: data.username, // mock user id,
      username: data.username,
    };
    return this.authService.generateTokens(profile.userId, profile);
  }

  @Post('/refresh-token')
  @NotRequireAuthentication()
  @HttpCode(HttpStatus.OK)
  async refreshToken(
    @Body() data: RefreshTokenRequest,
  ): Promise<TokenResponse> {
    return this.authService.refreshToken(data.refreshToken);
  }
}
