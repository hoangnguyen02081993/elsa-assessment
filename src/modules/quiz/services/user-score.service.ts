import { Injectable } from '@nestjs/common';
import { CachingService } from 'src/modules/caching';
import { InternalAuthService } from 'src/modules/shared/services/auth.service';
import {
  TopHighestUserModel,
  UpdateLeaderBoardRequest,
  UpdateLeaderBoardResponse,
} from '../models/user-score';
import { UserScoreRepository } from '../repositories/user-score.repository';

@Injectable()
export class UserScoreService {
  private readonly leaderboardCacheKey = 'leaderboard';
  private readonly leaderboardLimit = 100;
  constructor(
    private readonly userScoreRepository: UserScoreRepository,
    private readonly cachingService: CachingService,
    private readonly internalAuthService: InternalAuthService,
  ) {}

  public async leaderboard(): Promise<TopHighestUserModel[]> {
    // Get from cache first
    const cachedLeaderboard = await this.cachingService.get<
      TopHighestUserModel[]
    >(this.leaderboardCacheKey);

    if (cachedLeaderboard) {
      return cachedLeaderboard;
    }

    return this.getLeaderBoardFromDabase(true);
  }

  public async updateLeaderBoard(
    data: UpdateLeaderBoardRequest,
  ): Promise<UpdateLeaderBoardResponse> {
    const shouldChange = await this.shouldUpdateLeaderboard(data);
    if (!shouldChange) {
      return {
        isChanged: false,
        data: await this.leaderboard(),
      };
    }

    // Invalidate cache for future next request
    this.cachingService.del(this.leaderboardCacheKey);

    return {
      isChanged: true,
      data: await this.getLeaderBoardFromDabase(true),
    };
  }

  private async shouldUpdateLeaderboard(
    data: UpdateLeaderBoardRequest,
  ): Promise<boolean> {
    const cachedLeaderboard = await this.cachingService.get<
      TopHighestUserModel[]
    >(this.leaderboardCacheKey);
    if (!cachedLeaderboard) {
      return false;
    }

    // Check is change based on 2 points:
    // 1. Check if the user is not in the leaderboard and the score is higher than the lowest score in the leaderboard or the leaderboard is not full
    // 2. Check if the user is in the leaderboard but the score is different

    if (cachedLeaderboard.length === 0) {
      return true;
    }

    let isExisted = false;
    for (const item of cachedLeaderboard) {
      if (item.userId === data.userId) {
        isExisted = true;
        if (item.score !== data.score) {
          return true;
        }
        break;
      }
    }

    if (!isExisted) {
      const lowestScore = cachedLeaderboard[cachedLeaderboard.length - 1].score;
      if (data.score >= lowestScore) {
        return true;
      }

      if (cachedLeaderboard.length <= this.leaderboardLimit) {
        return true;
      }
    }

    return false;
  }

  private async getLeaderBoardFromDabase(
    setCache?: boolean,
  ): Promise<TopHighestUserModel[]> {
    const topHighest = (await this.userScoreRepository.topHighest(
      this.leaderboardLimit,
    )) as TopHighestUserModel[];
    const userIds = topHighest.map((item) => item.userId);
    const users = await this.internalAuthService.getUsersByIds(userIds);
    topHighest.forEach((item) => {
      item.user = users.find((u) => u.userId === item.userId);
    });

    // Cache the result
    if (setCache) {
      this.cachingService.set(this.leaderboardCacheKey, topHighest);
    }

    return topHighest;
  }
}
