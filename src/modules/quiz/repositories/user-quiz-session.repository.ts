import { Injectable, Scope } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma';
import { BaseRepository } from 'src/modules/prisma/base/base.repository';
import { UserQuizSessions } from '@prisma/client';

@Injectable({
  scope: Scope.REQUEST,
})
export class UserQuizSessionRepository extends BaseRepository {
  constructor(prismaService: PrismaService) {
    super(prismaService);
  }

  public async create(
    data: Partial<UserQuizSessions>,
  ): Promise<UserQuizSessions> {
    return this.client.userQuizSessions.create({
      data: {
        ...data,
        createdAt: new Date(),
      } as UserQuizSessions,
    });
  }

  public async getUserQuizSessionByQuizIds(
    userId: string,
    quizIds: string[],
  ): Promise<UserQuizSessions[]> {
    return this.client.userQuizSessions.findMany({
      where: {
        userId,
        quizId: {
          in: quizIds,
        },
      },
    });
  }
}
