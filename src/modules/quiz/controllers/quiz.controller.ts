import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { QuizService } from '../services/quiz.service';
import {
  FullQuizQuestionRepositoryModel,
  FullQuizRepositoryModel,
  QuizDto,
} from '../models/quiz';
import { QuizQuestionOptions } from '@prisma/client';

@Controller({
  path: ['/api/v1.0/quizzes'],
  version: ['1.0'],
})
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Get('')
  @HttpCode(HttpStatus.OK)
  async gets(): Promise<QuizDto[]> {
    // Assume because the quiz data list is small, so we don't need to handle with pagination. Actually, we should handle with pagination here
    return this.quizService
      .gets()
      .then((quizzes) => quizzes.map(this.transform));
  }

  private transform(quiz: FullQuizRepositoryModel): QuizDto {
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
    };
  }
}
