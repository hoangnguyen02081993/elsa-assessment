import { Transform } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export enum AuthType {
  Bearer = 'Bearer',
}

export class GetByIdsRequest {
  @IsNotEmpty()
  @Transform(({ value }) => value.split(','))
  userIds: string[];
}

export class UserProfile {
  userId: string;
  username: string;
}
