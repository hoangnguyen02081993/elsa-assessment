import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { UserQuizSessionService } from '../services/user-quiz-session.service';
import {
  UpdateLeaderBoardRequest,
  UpdateLeaderBoardResponse,
} from '../models/user-quiz-session';
import asyncLocalStorage from 'src/storage/async_local';

@Controller({
  path: ['/internal/api/v1.0/user-quiz-sessions'],
  version: ['1.0'],
})
export class InternalUserQuizSessionController {
  constructor(
    private readonly userQuizSessionService: UserQuizSessionService,
  ) {}

  @Post('/leaderboard')
  @HttpCode(HttpStatus.ACCEPTED)
  async updateLeaderboard(
    @Body() data: UpdateLeaderBoardRequest,
  ): Promise<UpdateLeaderBoardResponse> {
    asyncLocalStorage.getStore().cid = data.cid;
    return this.userQuizSessionService.updateLeaderBoard(data);
  }
}
