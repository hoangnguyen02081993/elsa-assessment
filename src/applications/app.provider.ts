import { Injectable } from '@nestjs/common';
import { AuthServiceAppModule, GameApiAppModule } from './app.module';

export type AppName = 'API_SERVICE' | 'CONSUMER_SERVICE' | 'SOCKET_MANAGER_SERVICE' | 'API_GATEWAY' | 'AUTH_SERVICE';

@Injectable()
export class AppProvider {
  public getAppModule() {
    const appName: AppName = (process.env.APP_NAME || 'API_GATEWAY') as AppName;
    return (
      {
        GAME_API: GameApiAppModule,
        AUTH_SERVICE: AuthServiceAppModule,
      }[appName] || GameApiAppModule
    );
  }
  public getAppName(): AppName {
    return (process.env.APP_NAME || 'API_GATEWAY') as AppName;
  }
}

export const appProvider = new AppProvider();
