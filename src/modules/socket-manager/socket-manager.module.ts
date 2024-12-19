import { Module } from '@nestjs/common';
import { InternalEventsController } from './controllers/event.internal.controller';
import { SocketGateway } from './gateways/socket.gateway';
import { WsAuthGuard } from 'src/decorators/ws-auth.guard';
import { EventService } from './services/event.service';
@Module({
  imports: [],
  controllers: [InternalEventsController],
  providers: [SocketGateway, WsAuthGuard, EventService],
})
export class SocketManagerModule {}
