import { Processor } from '@nestjs/bull';
import { UPDATE_LEADER_BOARD_QUEUE } from 'src/constants';
import { DoneCallback, Job } from 'bull';
import { BaseConsumer } from './base-consumer';
import { UpdateLeaderBoardMessage } from '../models/update-leader-board-message.model';
import { InternalSocketManagerService } from 'src/modules/shared/services/socket-manager.service';
import { InternalQuizAPIService } from 'src/modules/shared/services/quiz-api.service';

@Processor(UPDATE_LEADER_BOARD_QUEUE)
export class UpdateLeaderBoardConsumer extends BaseConsumer<UpdateLeaderBoardMessage> {
  constructor(
    private readonly internalSocketManagerService: InternalSocketManagerService,
    private readonly internalQuizAPIService: InternalQuizAPIService,
  ) {
    super();
    this.logger.log('UpdateLeaderBoardConsumer created');
  }

  async handleMessage(
    job: Job<UpdateLeaderBoardMessage>,
    done: DoneCallback,
  ): Promise<void> {
    try {
      const message = job.data;
      this.logger.info(
        `handling message - messageId:${job.id}`,
        message,
        this.handleMessage.name,
      );

      const updateLeaderBoardResponse =
        await this.internalQuizAPIService.updateLeaderBoard(message);
      if (!updateLeaderBoardResponse.isChanged) {
        this.logger.info(`no change in leaderboard:- messageId:${job.id}`);
        done();
        return;
      }

      await this.internalSocketManagerService.triggerLeaderBoard({
        cid: message.cid,
        data: [],
        changedData: {
          userId: message.userId,
          score: message.score,
        },
      });

      this.logger.info(`handled message:- messageId:${job.id}`);
      done();
    } catch (err) {
      this.logger.error(`error handling message - messageId:${job.id}`, err);
      done(err);
    }
  }
}
