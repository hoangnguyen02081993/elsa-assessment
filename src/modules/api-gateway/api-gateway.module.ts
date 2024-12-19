import { Module } from '@nestjs/common';
import { AuthServiceController } from './auth-service/auth-service.controller';
import { QuizSessionServiceController } from './quiz-api-service/quiz-session-service.controller';
import { QuizServiceController } from './quiz-api-service/quiz-service.controller';
import { UserQuizSessionServiceController } from './quiz-api-service/user-quiz-session-service.controlle';
@Module({
  imports: [],
  controllers: [
    AuthServiceController,
    QuizSessionServiceController,
    QuizServiceController,
    UserQuizSessionServiceController,
  ],
  providers: [],
})
export class APIGatewayModule {}
