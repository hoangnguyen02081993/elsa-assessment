import { IoAdapter } from '@nestjs/platform-socket.io';
import { ServerOptions } from 'socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

export class RedisIoAdapter extends IoAdapter {
  private adapterConstructor: ReturnType<typeof createAdapter>;

  async connectToRedis(configService: ConfigService): Promise<void> {
    const options = {
      redisHost: configService.get<string>('redisHost'),
      redisPort: configService.get<number>('redisPort'),
    };

    const pubClient = new Redis(
      `redis://${options.redisHost}:${options.redisPort}`,
      {
        reconnectOnError(err) {
          const targetError = 'MOVED';
          if (err.message.includes(targetError)) {
            // Only reconnect reconnect and resend the failed command after reconnection. when the error contains "MOVED"
            return 2;
          }
        },
      },
    );

    const subClient = pubClient.duplicate();
    this.adapterConstructor = createAdapter(pubClient, subClient);
  }

  createIOServer(port: number, options?: ServerOptions): any {
    const server = super.createIOServer(port, options);
    server.adapter(this.adapterConstructor);
    return server;
  }
}
