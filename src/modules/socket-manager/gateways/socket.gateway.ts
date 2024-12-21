import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Logger } from '@nestjs/common';
import { WsAuthGuard } from 'src/decorators/ws-auth.guard';

@WebSocketGateway({
  path: '/ws',
  cors: true,
})
export class SocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private logger = new Logger(SocketGateway.name);
  public sockets = new Set();

  @WebSocketServer()
  public server: Server;

  public globalRoom = 'global';
  private defaultRooms = [this.globalRoom];

  constructor(private wsAuthGurad: WsAuthGuard) {}

  async afterInit() {
    this.logger.log('Server started');
  }

  async handleConnection(socket: any) {
    const canActive = await this.wsAuthGurad.canActivate(socket);
    if (!canActive) {
      socket.disconnect();
      return;
    }
    const user = this.wsAuthGurad.getRequest(socket).user;
    this.joinDefaultRooms(socket);
    socket.join(user.userId); // join user's room to receive self messages
    this.logger.log('a client connected');
  }

  async handleDisconnect() {
    this.logger.log('a client disconnected');
  }

  private joinDefaultRooms(socket: any) {
    this.defaultRooms.forEach((room) => {
      socket.join(room);
    });
  }
}
