import { Injectable } from '@nestjs/common';
import { InternalHttpClientService } from 'src/modules/http';

import { ConfigService } from '@nestjs/config';

@Injectable()
export class InternalAuthService {
  private readonly authServiceUrl: string;
  constructor(
    private readonly httpService: InternalHttpClientService,
    configService: ConfigService,
  ) {
    this.authServiceUrl = configService.get<string>('authServiceUrl');
  }

  async getUsersByIds(userIds: string[]): Promise<
    {
      userId: string;
      username: string;
    }[]
  > {
    return await this.httpService.get(
      `${this.authServiceUrl}/internal/api/v1.0/users/by-ids`,
      {
        userIds: userIds.join(','),
      },
    );
  }
}
