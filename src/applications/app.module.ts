import { Module } from '@nestjs/common';
import { CoreAppModule } from './core-app.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Environment, EnvironmentAPIGatewayVariables, EnvironmentAuthServiceVariables } from '../config/validation';
import configuration from '../config/configuration';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/decorators/auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from 'src/modules/auth';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema: new EnvironmentAPIGatewayVariables(),
      validationOptions: {
        abortEarly: true,
        appName: 'API_GATEWAY',
      },
    }),
    JwtModule.registerAsync({
      global: true,
      useFactory: (configService: ConfigService) => {
        const publicKey = configService.get<string>('jwtAccesstokenPublicKey');
        return {
          secret: publicKey,
        };
      },
      inject: [ConfigService],
    }),
    CoreAppModule.forRootAsync({
      useFactory: (configSerivce: ConfigService) => ({
        env: configSerivce.get<Environment>('env'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class GameApiAppModule {}

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema: new EnvironmentAuthServiceVariables(),
      validationOptions: {
        abortEarly: true,
        appName: 'AUTH_SERVICE',
      },
    }),
    JwtModule.registerAsync({
      global: true,
      useFactory: (configService: ConfigService) => {
        const publicKey = configService.get<string>('jwtAccesstokenPublicKey');
        return {
          secret: publicKey,
        };
      },
      inject: [ConfigService],
    }),
    CoreAppModule.forRootAsync({
      useFactory: (configSerivce: ConfigService) => ({
        env: configSerivce.get<Environment>('env'),
      }),
      inject: [ConfigService],
    }),
    AuthModule,
  ],
})
export class AuthServiceAppModule {}
