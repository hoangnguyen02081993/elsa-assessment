import { Injectable, Scope } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma';
import { BaseRepository } from 'src/modules/prisma/base/base.repository';
import { FullQuizRepositoryModel } from '../models/quiz';

@Injectable({
  scope: Scope.REQUEST,
})
export class QuizRepository extends BaseRepository {
  constructor(prismaService: PrismaService) {
    super(prismaService);
  }

  public async gets(): Promise<FullQuizRepositoryModel[]> {
    return this.client.quizzes.findMany({
      include: {
        quizQuestions: {
          include: {
            quizQuestionOptions: true,
          },
        },
      },
    });
  }

  public async getFullByCode(code: string): Promise<FullQuizRepositoryModel> {
    return this.client.quizzes.findUnique({
      where: {
        code,
      },
      include: {
        quizQuestions: {
          include: {
            quizQuestionOptions: true,
          },
        },
      },
    });
  }
}
