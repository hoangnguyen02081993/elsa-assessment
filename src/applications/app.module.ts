import { Module } from '@nestjs/common';
import { CoreAppModule } from './core-app.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  Environment,
  EnvironmentAPIGatewayVariables,
  EnvironmentAuthServiceVariables,
  EnvironmentQuizConsumerVariables,
  EnvironmentSocketManagerVariables,
} from '../config/validation';
import configuration from '../config/configuration';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from 'src/modules/auth';
import { APIGatewayModule } from 'src/modules/api-gateway/api-gateway.module';
import { CachingModule } from 'src/modules/caching';
import { QuizModule } from 'src/modules/quiz/quiz.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/decorators';
import { QueueConsumerModule } from 'src/modules/queue/queue-consumer.module';
import { SocketManagerModule } from 'src/modules/socket-manager/socket-manager.module';
import { SharedModule } from 'src/modules/shared/shared.module';

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
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
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
export class AuthServiceAppModule {}

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema: new EnvironmentAuthServiceVariables(),
      validationOptions: {
        abortEarly: true,
        appName: 'QUIZ_API_SERVICE',
      },
    }),
    CoreAppModule.forRootAsync({
      useFactory: (configSerivce: ConfigService) => ({
        env: configSerivce.get<Environment>('env'),
      }),
      inject: [ConfigService],
    }),
    SharedModule,
    CachingModule,
    QuizModule,
  ],
})
export class QuizAPIAppModule {}

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema: new EnvironmentQuizConsumerVariables(),
      validationOptions: {
        abortEarly: true,
        appName: 'QUIZ_CONSUMER_SERVICE',
      },
    }),
    CoreAppModule.forRootAsync({
      useFactory: (configSerivce: ConfigService) => ({
        env: configSerivce.get<Environment>('env'),
      }),
      inject: [ConfigService],
    }),
    QueueConsumerModule,
  ],
})
export class QuizConsumerAppModule {}

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema: new EnvironmentSocketManagerVariables(),
      validationOptions: {
        abortEarly: true,
        appName: 'SOCKET_MANAGER_SERVICE',
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
    SocketManagerModule,
  ],
})
export class SocketManagerAppModule {}
