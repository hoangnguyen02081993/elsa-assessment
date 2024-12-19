import { Controller, Post } from '@nestjs/common';
import { NotRequireAuthentication } from 'src/decorators';
import { InternalHttpClientService } from 'src/modules/http';
import { BaseAPIGatewayController } from '../base/api-gateway.base.controller';
import { ConfigService } from '@nestjs/config';

@Controller({
  path: ['/api/v1.0/auth'],
  version: ['1.0'],
})
export class AuthServiceController extends BaseAPIGatewayController {
  constructor(
    httpService: InternalHttpClientService,
    configService: ConfigService,
  ) {
    const authServiceUrl = configService.get<string>('authServiceUrl');
    super(httpService, authServiceUrl);
  }

  @Post('/login')
  @NotRequireAuthentication()
  async loginByProvider() {
    return this.forward('/api/v1.0/auth/login', 'POST');
  }

  @Post('/refresh-token')
  @NotRequireAuthentication()
  async refreshToken() {
    return this.forward('/api/v1.0/auth/refresh-token', 'POST');
  }
}
