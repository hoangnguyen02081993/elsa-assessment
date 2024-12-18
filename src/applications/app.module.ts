import { Module } from '@nestjs/common';
import { CoreAppModule } from './core-app.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Environment, EnvironmentAPIGatewayVariables, EnvironmentAuthServiceVariables } from '../config/validation';
import configuration from '../config/configuration';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from 'src/modules/auth';
import { APIGatewayModule } from 'src/modules/api-gateway/api-gateway.module';

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
    CoreAppModule.forRootAsync({
      useFactory: (configSerivce: ConfigService) => ({
        env: configSerivce.get<Environment>('env'),
      }),
      inject: [ConfigService],
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
    APIGatewayModule,
  ],
})
export class APIGatewayAppModule {}

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
    CoreAppModule.forRootAsync({
      useFactory: (configSerivce: ConfigService) => ({
        env: configSerivce.get<Environment>('env'),
      }),
      inject: [ConfigService],
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
    AuthModule,
  ],
})
export class AuthServiceAppModule { }
