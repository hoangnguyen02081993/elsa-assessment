import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { TopHighestUserModel, UserScoreModel } from '../models/user-score';
import { UserScoreService } from '../services/user-score.service';
import asyncLocalStorage from 'src/storage/async_local';
import { UserScores } from '@prisma/client';

@Controller({
  path: ['/api/v1.0/user-scores'],
  version: ['1.0'],
})
export class UserScoreController {
  constructor(private readonly userScoreService: UserScoreService) {}

  @Get('/leaderboard')
  @HttpCode(HttpStatus.OK)
  async leaderboard(): Promise<TopHighestUserModel[]> {
    return this.userScoreService.leaderboard();
  }

  @Get('/me')
  @HttpCode(HttpStatus.OK)
  async me(): Promise<UserScoreModel> {
    const userId = asyncLocalStorage.getStore().userInfo.userId;
    return this.userScoreService.getByUserId(userId).then((userScore) => this.transformUserScoreModel(userScore));
  }

  private transformUserScoreModel(userScore: UserScores): UserScoreModel {
    return {
      userId: userScore.userId,
      score: userScore.score,
    };
  }
}
