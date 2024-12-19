import { Injectable } from '@nestjs/common';
import { CachingService } from 'src/modules/caching';
import { QuizRepository } from '../repositories/quiz.repository';
import { FullQuizRepositoryModel } from '../models/quiz';

@Injectable()
export class QuizService {
  constructor(
    private readonly cachingService: CachingService,
    private readonly quizRepository: QuizRepository,
  ) {}

  public async gets(): Promise<FullQuizRepositoryModel[]> {
    // Use cache data to avoid the request hit to database. Please ensure when update the quiz data, the cachedData should be invalidated as well
    // Because we don't have the flow to update the quiz data, so I can't show the invalidation flow here
    const cachedKey = `quiz:all`;
    const cachedData =
      await this.cachingService.get<FullQuizRepositoryModel[]>(cachedKey);
    if (cachedData) {
      return cachedData;
    }

    const quizzes = await this.quizRepository.gets();
    await this.cachingService.set(cachedKey, quizzes);

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
