import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { SubmitQuizSessionRequest } from '../models/quiz-session';
import { QuizSessionService } from '../services/quiz-session.service';
import asyncLocalStorage from 'src/storage/async_local';

@Controller({
  path: ['/api/v1.0/quiz-sessions'],
  version: ['1.0'],
})
export class QuizSessionController {
  constructor(private readonly quizSessionService: QuizSessionService) {}

  @Post('')
  @HttpCode(HttpStatus.ACCEPTED)
  async submit(@Body() data: SubmitQuizSessionRequest): Promise<void> {
    const userId = asyncLocalStorage.getStore().userInfo.userId;
    const cid = asyncLocalStorage.getStore().cid;
    await this.quizSessionService.submitQuizSession(data, userId, cid);
  }
}
