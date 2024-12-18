import { Module } from '@nestjs/common';
import { AuthServiceController } from './controllers/auth-service.controller';
@Module({
  imports: [],
  controllers: [AuthServiceController],
  providers: []
})
export class APIGatewayModule {}
