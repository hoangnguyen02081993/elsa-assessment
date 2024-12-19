import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { UserQuizSessionService } from '../services/user-quiz-session.service';
import { TopHighestUserModel } from '../models/user-quiz-session';

@Controller({
  path: ['/api/v1.0/user-quiz-sessions'],
  version: ['1.0'],
})
export class UserQuizSessionController {
  constructor(
    private readonly userQuizSessionService: UserQuizSessionService,
  ) {}

  @Get('/leaderboard')
  @HttpCode(HttpStatus.OK)
  async leaderboard(): Promise<TopHighestUserModel[]> {
    return this.userQuizSessionService.leaderboard();
  }
}
