import { Injectable } from '@nestjs/common';
import { LeaderBoardEventRequest } from '../models/update-leader-board';
import { SocketGateway } from '../gateways/socket.gateway';

@Injectable()
export class EventService {
  private readonly uploadLeaderBoardEvent = 'updateLeaderBoard';
  constructor(private readonly socketGateway: SocketGateway) {}

  public async executeUpdateLeaderBoard(
    data: LeaderBoardEventRequest,
  ): Promise<void> {
    this.socketGateway.server
      .to(this.socketGateway.globalRoom)
      .emit(this.uploadLeaderBoardEvent, data);
  }
}
