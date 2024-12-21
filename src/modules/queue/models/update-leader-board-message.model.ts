import { QueuePriority } from 'src/constants';
import { BaseMessage } from './message-base.model';

export type UpdateLeaderBoardMessage = BaseMessage & {
  userId: string;
  score: number;
};

export type UpdateLeaderBoardMessageOptions = {
  priority?: QueuePriority;
};
