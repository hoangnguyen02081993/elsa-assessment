import { Module } from '@nestjs/common';
import { AuthServiceController } from './auth-service/auth-service.controller';
import { QuizSessionServiceController } from './quiz-api-service/quiz-session-service.controller';
import { QuizServiceController } from './quiz-api-service/quiz-service.controller';
import { UserScoreServiceController } from './quiz-api-service/user-score-service.controlle';
@Module({
  imports: [],
  controllers: [
    AuthServiceController,
    QuizSessionServiceController,
    QuizServiceController,
    UserScoreServiceController,
  ],
  providers: [],
})
export class APIGatewayModule {}
