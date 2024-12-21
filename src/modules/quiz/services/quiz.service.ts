import { Injectable } from '@nestjs/common';
import { CachingService } from 'src/modules/caching';
import { QuizRepository } from '../repositories/quiz.repository';
import {
  FullGetQuizResponseData,
  FullQuizRepositoryModel,
} from '../models/quiz';
import { UserQuizSessionRepository } from '../repositories/user-quiz-session.repository';

@Injectable()
export class QuizService {
  constructor(
    private readonly cachingService: CachingService,
    private readonly quizRepository: QuizRepository,
    private readonly userQuizSessionRepository: UserQuizSessionRepository,
  ) {}

  public async gets(options?: {
    userId?: string;
    includeProfile?: boolean;
  }): Promise<FullGetQuizResponseData[]> {
    // Use cache data to avoid the request hit to database. Please ensure when update the quiz data, the cachedData should be invalidated as well
    // Because we don't have the flow to update the quiz data, so I can't show the invalidation flow here
    const cachedKey = `quiz:all`;
    let quizzes =
      await this.cachingService.get<FullGetQuizResponseData[]>(cachedKey);
    if (!quizzes) {
      quizzes = (await this.quizRepository.gets()) as FullGetQuizResponseData[];
      await this.cachingService.set(cachedKey, quizzes);
    }

    // Set profile
    if (options?.includeProfile) {
      const userSessions =
        await this.userQuizSessionRepository.getUserQuizSessionByQuizIds(
          options.userId,
          quizzes.map((quiz) => quiz.id),
        );
      quizzes.forEach((quiz) => {
        const userSession = userSessions.find(
          (userSession) => userSession.quizId === quiz.id,
        );
        quiz.profile = {
          score: userSession?.score || 0,
          isCompleted: !!userSession,
          userId: options.userId,
          completedAt: userSession?.createdAt,
        };
      });
    }

    return quizzes;
  }

  public async getFullByCode(code: string): Promise<FullQuizRepositoryModel> {
    // Use cache data to avoid the request hit to database. Please ensure when update the quiz data, the cachedData should be invalidated as well
    // Because we don't have the flow to update the quiz data, so I can't show the invalidation flow here
    const cachedKey = `quiz:${code}`;
    const cachedData =
      await this.cachingService.get<FullQuizRepositoryModel>(cachedKey);
    if (cachedData) {
      return cachedData;
    }

    const quiz = await this.quizRepository.getFullByCode(code);
    await this.cachingService.set(cachedKey, quiz);

    return quiz;
  }
}
