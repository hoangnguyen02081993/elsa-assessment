export class LeaderBoardData {
  username: string;
  userId: string;
  score: number;
}

export class LeaderBoardChangedDataEventRequest {
  public userId: string;
  public score: number;
}

export class LeaderBoardEventRequest {
  public cid: string;
  public data: LeaderBoardData[];
  public changedData: LeaderBoardChangedDataEventRequest;
}

export class TopHighestUserModel {
  userId: string;
  score: number;
  user: {
    userId: string;
    username: string;
  };
}

export class UpdateLeaderBoardResponse {
  data: TopHighestUserModel[];
  isChanged: boolean;
}

export class UpdateLeaderBoardRequest {
  public userId: string;
  public score: number;
}
