import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  UpdateLeaderBoardRequest,
  UpdateLeaderBoardResponse,
} from '../models/user-score';
import asyncLocalStorage from 'src/storage/async_local';
import { UserScoreService } from '../services/user-score.service';

@Controller({
  path: ['/internal/api/v1.0/user-scores'],
  version: ['1.0'],
})
export class InternalUserScoreController {
  constructor(private readonly userScoreService: UserScoreService) {}

  @Post('/leaderboard')
  @HttpCode(HttpStatus.OK)
  async updateLeaderboard(
    @Body() data: UpdateLeaderBoardRequest,
  ): Promise<UpdateLeaderBoardResponse> {
    asyncLocalStorage.getStore().cid = data.cid;
    return this.userScoreService.updateLeaderBoard(data);
  }
}
