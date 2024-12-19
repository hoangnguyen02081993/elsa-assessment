import { Injectable, Scope } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma';
import { BaseRepository } from 'src/modules/prisma/base/base.repository';
import { UserQuizSessions } from '@prisma/client';
import { TopHighestModel } from '../models/user-quiz-session';

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

  public async topHighest(limit: number): Promise<TopHighestModel[]> {
    return this.client.userQuizSessions.findMany({
      select: {
        userId: true,
        score: true,
      },
      take: limit,
      orderBy: [
        {
          score: 'desc',
        },
        {
          updatedAt: 'desc',
        },
      ],
    });
  }
}
