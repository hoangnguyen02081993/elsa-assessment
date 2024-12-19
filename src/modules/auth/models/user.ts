import { Transform } from 'class-transformer';
import { IsString } from 'class-validator';

export enum AuthType {
  Bearer = 'Bearer',
}

export class GetByIdsRequest {
  @IsString()
  @Transform(({ value }) => value.split(','))
  userIds: string[];
}

export class UserProfile {
  userId: string;
  username: string;
}
