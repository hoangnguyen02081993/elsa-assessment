import { Controller, Get } from '@nestjs/common';
import { InternalHttpClientService } from 'src/modules/http';
import { BaseAPIGatewayController } from '../base/api-gateway.base.controller';
import { ConfigService } from '@nestjs/config';

@Controller({
  path: ['/api/v1.0/quizzes'],
  version: ['1.0'],
})
export class QuizServiceController extends BaseAPIGatewayController {
  constructor(
    httpService: InternalHttpClientService,
    configService: ConfigService,
  ) {
    const quizAPIServiceUrl = configService.get<string>('quizAPIServiceUrl');
    super(httpService, quizAPIServiceUrl);
  }

  @Get('/')
  async gets() {
    return this.forward('/api/v1.0/quizzes', 'GET');
  }
}
