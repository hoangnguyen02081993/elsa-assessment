import { Injectable, Scope } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma';
import { BaseRepository } from 'src/modules/prisma/base/base.repository';
import { UserScores } from '@prisma/client';

@Injectable({
  scope: Scope.REQUEST,
})
export class UserScoreRepository extends BaseRepository {
  constructor(prismaService: PrismaService) {
    super(prismaService);
  }

  public async addPoint(userId: string, score: number): Promise<UserScores> {
    return this.client.userScores.upsert({
      where: {
        userId,
      },
      create: {
        userId,
        score,
        createdAt: new Date(),
      } as UserScores,
      update: {
        score: {
          increment: score,
        },
        updatedAt: new Date(),
      },
    });
  }
}
