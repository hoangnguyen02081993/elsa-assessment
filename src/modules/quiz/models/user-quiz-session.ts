import { IsNumber, IsString } from 'class-validator';

export class TopHighestModel {
  userId: string;
  score: number;
}

export class TopHighestUserModel extends TopHighestModel {
  user: {
    userId: string;
    username: string;
  };
}

export class UpdateLeaderBoardRequest {
  @IsString()
  userId: string;

  @IsNumber()
  score: number;

  @IsString()
  cid: string;
}

export class UpdateLeaderBoardResponse {
  data: TopHighestUserModel[];
  isChanged: boolean;
}
