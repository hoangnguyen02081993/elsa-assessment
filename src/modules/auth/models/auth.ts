import { IsString } from 'class-validator';


export enum AuthType {
  Bearer = 'Bearer',
}

export class LoginRequest {
  @IsString()
  username: string;

  @IsString()
  password: string;
}

export class RefreshTokenRequest {
  @IsString()
  refreshToken: string;
}

export class TokenResponse {
  accessToken: string;
  refreshToken: string;
  authType: AuthType;
}