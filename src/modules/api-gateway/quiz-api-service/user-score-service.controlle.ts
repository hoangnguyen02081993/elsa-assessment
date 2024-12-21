import { Controller, Get } from '@nestjs/common';
import { InternalHttpClientService } from 'src/modules/http';
import { BaseAPIGatewayController } from '../base/api-gateway.base.controller';
import { ConfigService } from '@nestjs/config';

@Controller({
  path: ['/api/v1.0/user-scores'],
  version: ['1.0'],
})
export class UserScoreServiceController extends BaseAPIGatewayController {
  constructor(
    httpService: InternalHttpClientService,
    configService: ConfigService,
  ) {
    const quizAPIServiceUrl = configService.get<string>('quizAPIServiceUrl');
    super(httpService, quizAPIServiceUrl);
  }

  @Get('/leaderboard')
  async submit() {
    return this.forward('/api/v1.0/user-scores/leaderboard', 'GET');
  }

  @Get('/me')
  async me() {
    return this.forward('/api/v1.0/user-scores/me', 'GET');
  }
}
