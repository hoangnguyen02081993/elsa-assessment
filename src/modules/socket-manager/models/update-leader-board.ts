import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

export class LeaderBoardData {
  @IsString()
  username: string;

  @IsString()
  userId: string;

  @IsNumber()
  score: number;
}

export class LeaderBoardChangedDataEventRequest {
  @IsString()
  public userId: string;

  @IsNumber()
  public score: number;
}

export class LeaderBoardEventRequest {
  @IsString()
  public cid: string;

  @IsArray()
  @Type(() => LeaderBoardData)
  data: LeaderBoardData[];

  @Type(() => LeaderBoardChangedDataEventRequest)
  @ValidateNested()
  @IsNotEmpty()
  changedData: LeaderBoardChangedDataEventRequest;
}
