import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { QUEUE_PREFIX, UPDATE_LEADER_BOARD_QUEUE } from 'src/constants';
import { CachingModule } from '../caching';
import { ConfigService } from '@nestjs/config';
import { UpdateLeaderBoardProducer } from './producer/update-leader-board-producer';

@Module({
  imports: [
    CachingModule,
    BullModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const options = {
          redisHost: configService.get<string>('redisHost'),
          redisPort: configService.get<number>('redisPort'),
        };
        return {
          prefix: QUEUE_PREFIX,
          redis: {
            host: options.redisHost,
            port: options.redisPort,

            reconnectOnError(err) {
              const targetError = 'MOVED';
              if (err.message.includes(targetError)) {
                // Only reconnect reconnect and resend the failed command after reconnection. when the error contains "MOVED"
                return 2;
              }
            },
          },
        };
      },
    }),
    BullModule.registerQueue({
      name: UPDATE_LEADER_BOARD_QUEUE,
      defaultJobOptions: {
        removeOnComplete: true,
        removeOnFail: true,
      },
    }),
  ],
  providers: [UpdateLeaderBoardProducer],
  exports: [UpdateLeaderBoardProducer],
})
export class QueueProducerModule {}
