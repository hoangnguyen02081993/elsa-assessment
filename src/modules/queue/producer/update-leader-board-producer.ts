import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import {
  UpdateLeaderBoardMessage,
  UpdateLeaderBoardMessageOptions,
} from '../models/update-leader-board-message.model';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { BaseProducer } from './base-producer';
import { QueuePriority, UPDATE_LEADER_BOARD_QUEUE } from 'src/constants';

@Injectable()
export class UpdateLeaderBoardProducer extends BaseProducer<UpdateLeaderBoardMessage> {
  constructor(@InjectQueue(UPDATE_LEADER_BOARD_QUEUE) queueClient: Queue) {
    super(queueClient);
  }
  async sendMessage(
    message: UpdateLeaderBoardMessage,
    options?: UpdateLeaderBoardMessageOptions,
  ): Promise<void> {
    const jobId = uuidv4();
    this.logger.info('sending message:', message, this.sendMessage.name);
    await this.queueClient.add(message, {
      jobId,
      attempts: 10, // hard code retry to 10 times
      backoff: 10000, // 10 seconds
      priority: options?.priority || QueuePriority.Normal,
    });
    this.logger.info('sent message:', message, this.sendMessage.name);
  }
}
