import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { TopHighestUserModel } from '../models/user-score';
import { UserScoreService } from '../services/user-score.service';

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
}
