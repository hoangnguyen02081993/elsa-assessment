import { Injectable } from '@nestjs/common';
import { InternalHttpClientService } from 'src/modules/http';

import { ConfigService } from '@nestjs/config';
import {
  UpdateLeaderBoardRequest,
  UpdateLeaderBoardResponse,
} from '../models/update-leader-board';

@Injectable()
export class InternalQuizAPIService {
  private readonly quizAPIServiceUrl: string;
  constructor(
    private readonly httpService: InternalHttpClientService,
    configService: ConfigService,
  ) {
    this.quizAPIServiceUrl = configService.get<string>('quizAPIServiceUrl');
  }

  async updateLeaderBoard(
    data: UpdateLeaderBoardRequest,
  ): Promise<UpdateLeaderBoardResponse> {
    return await this.httpService.post(
      `${this.quizAPIServiceUrl}/internal/api/v1.0/user-quiz-sessions/leaderboard`,
      data,
    );
  }
}
