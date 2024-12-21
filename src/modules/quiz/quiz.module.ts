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
import { InternalUserScoreController } from './controllers/user-score.internal.controller';
import { UserScoreController } from './controllers/user-score.controller';
import { UserScoreService } from './services/user-score.service';
@Module({
  imports: [QueueProducerModule, PrismaModule],
  controllers: [
    QuizController,
    QuizSessionController,
    UserScoreController,
    InternalUserScoreController,
  ],
  providers: [
    QuizService,
    QuizSessionService,
    UserScoreService,
    UserQuizSessionRepository,
    UserScoreRepository,
    QuizRepository,
  ],
})
export class QuizModule {}
