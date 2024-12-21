import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { QuizService } from '../services/quiz.service';
import {
  FullGetQuizResponseData,
  FullQuizQuestionRepositoryModel,
  GetsRequest,
  QuizDto,
} from '../models/quiz';
import { QuizQuestionOptions } from '@prisma/client';
import asyncLocalStorage from 'src/storage/async_local';

@Controller({
  path: ['/api/v1.0/quizzes'],
  version: ['1.0'],
})
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Get('')
  @HttpCode(HttpStatus.OK)
  async gets(@Query() data: GetsRequest): Promise<QuizDto[]> {
    // Assume because the quiz data list is small, so we don't need to handle with pagination. Actually, we should handle with pagination here
    const userId = asyncLocalStorage.getStore().userInfo.userId;

    return this.quizService
      .gets({
        userId: userId,
        includeProfile: data.includeProfile,
      })
      .then((quizzes) => quizzes.map(this.transform));
  }

  private transform(quiz: FullGetQuizResponseData): QuizDto {
    return {
      id: quiz.id,
      code: quiz.code,
      name: quiz.name,
      questions: quiz.quizQuestions.map(
        (question: FullQuizQuestionRepositoryModel) => ({
          id: question.id,
          text: question.question,
          options: question.quizQuestionOptions.map(
            (option: QuizQuestionOptions) => ({
              id: option.id,
              text: option.option,
            }),
          ),
        }),
      ),
      profile: quiz.profile,
    };
  }
}
