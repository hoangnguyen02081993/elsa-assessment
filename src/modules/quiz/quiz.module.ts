import { Module } from '@nestjs/common';
import { QuizSessionController } from './controllers/quiz-session.controller';
import { QuizSessionService } from './services/quiz-session.service';
import { QuizService } from './services/quiz.service';
import { UserQuizSessionRepository } from './repositories/user-quiz-session.repository';
import { PrismaModule } from '../prisma';
import { UserScoreRepository } from './repositories/user-score.repository';
import { QueueProducerModule } from '../queue';
import { QuizRepository } from './repositories/quiz.repository';
import { QuizController } from './controllers/quiz.controller';
import { UserQuizSessionService } from './services/user-quiz-session.service';
import { UserQuizSessionController } from './controllers/user-quiz-session.controller';
import { InternalUserQuizSessionController } from './controllers/user-quiz-session.internal.controller';
@Module({
  imports: [QueueProducerModule, PrismaModule],
  controllers: [
    QuizController,
    QuizSessionController,
    UserQuizSessionController,
    InternalUserQuizSessionController,
  ],
  providers: [
    QuizService,
    QuizSessionService,
    UserQuizSessionService,
    UserQuizSessionRepository,
    UserScoreRepository,
    QuizRepository,
  ],
})
export class QuizModule {}
