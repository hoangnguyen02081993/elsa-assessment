import { ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AUTHORIZATION } from 'src/constants';
import { Logger } from 'src/modules/loggers';

@Injectable()
export class WsAuthGuard {
  private readonly jwtAccesstokenPublicKey: string;
  constructor(
    private readonly jwtService: JwtService,
    private readonly logger: Logger,
    private readonly configService: ConfigService,
  ) {
    this.jwtAccesstokenPublicKey = this.configService.get<string>(
      'jwtAccesstokenPublicKey',
    );
  }

  getRequest(context: any) {
    if (context.switchToWs) {
      return context.switchToWs().getClient();
    }
    if (context.getClient) {
      return context.getClient();
    }
    return context;
  }

  getResponse(context: ExecutionContext) {
    return context;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const accessToken =
      this.getRequest(context).handshake.headers[AUTHORIZATION.toLowerCase()];
    if (!accessToken) {
      return false;
    }

    try {
      const user = await this.jwtService.verifyAsync(accessToken, {
        publicKey: this.jwtAccesstokenPublicKey,
      });
      this.getRequest(context).user = user;
      return true;
    } catch (err) {
      this.logger.warn(err.message, err.stack, 'WsAuthGuard.canActivate');
      return false;
    }
  }

  handleRequest<TUser = any>(
    err: any,
    user: any,
    info: any,
    context: any,
  ): TUser {
    const socket = this.getRequest(context);
    if (err || info) {
      socket.disconnect();
    }
    return user;
  }
}
