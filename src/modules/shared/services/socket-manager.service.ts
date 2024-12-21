import { Inject, Injectable } from '@nestjs/common';
import {
  InternalHttpClientService,
  SINGLE_INTERNAL_HTTP_CLIENT,
} from 'src/modules/http';

import { ConfigService } from '@nestjs/config';
import { LeaderBoardEventRequest } from '../models/update-leader-board';

@Injectable()
export class InternalSocketManagerService {
  private readonly socketManagerServiceUrl: string;
  constructor(
    @Inject(SINGLE_INTERNAL_HTTP_CLIENT)
    private readonly httpService: InternalHttpClientService,
    configService: ConfigService,
  ) {
    this.socketManagerServiceUrl = configService.get<string>(
      'socketManagerServiceUrl',
    );
  }

  async triggerLeaderBoard(data: LeaderBoardEventRequest): Promise<void> {
    await this.httpService.post(
      `${this.socketManagerServiceUrl}/internal/api/v1.0/events/leaderboard`,
      data,
    );
  }
}
