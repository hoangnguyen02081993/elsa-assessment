import { Injectable } from '@nestjs/common';
import { LeaderBoardChangedDataEventRequest, LeaderBoardEventRequest } from '../models/update-leader-board';
import { SocketGateway } from '../gateways/socket.gateway';

@Injectable()
export class EventService {
  private readonly uploadLeaderBoardEvent = 'updateLeaderBoard';
  private readonly uploadSelfScoreEvent = 'updateSelfScore';
  constructor(private readonly socketGateway: SocketGateway) {}

  public async executeUpdateLeaderBoard(
    data: LeaderBoardEventRequest,
  ): Promise<void> {
    this.socketGateway.server
      .to(this.socketGateway.globalRoom)
      .emit(this.uploadLeaderBoardEvent, data);
  }

  public async executeUpdateSelfScore(data: LeaderBoardChangedDataEventRequest): Promise<void> {
    this.socketGateway.server.to(data.userId).emit(this.uploadSelfScoreEvent, data);
  }
}
