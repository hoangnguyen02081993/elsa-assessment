import { HttpStatus, Injectable } from '@nestjs/common';
import {
  SubmitQuizQuestions,
  SubmitQuizSessionRequest,
} from '../models/quiz-session';
import { QuizService } from './quiz.service';
import { BusinessException } from 'src/exceptions';
import { ERROR_CODES, getErorrMessage } from 'src/constants/errors';
import { FullQuizRepositoryModel } from '../models/quiz';
import { PrismaService } from 'src/modules/prisma';
import { UserQuizSessionRepository } from '../repositories/user-quiz-session.repository';
import { UserScoreRepository } from '../repositories/user-score.repository';
import { UpdateLeaderBoardProducer } from 'src/modules/queue/producer/update-leader-board-producer';

@Injectable()
export class QuizSessionService {
  constructor(
    private readonly quizService: QuizService,
    private readonly prismaService: PrismaService,
    private readonly userQuizSessionRepository: UserQuizSessionRepository,
    private readonly userScoreRepository: UserScoreRepository,
    private readonly updateLeaderBoardProducer: UpdateLeaderBoardProducer,
  ) {}

  public async submitQuizSession(
    data: SubmitQuizSessionRequest,
    userId: string,
    cid: string,
  ): Promise<void> {
    const quiz = await this.quizService.getFullByCode(data.quizCode);
    if (!quiz) {
      throw new BusinessException({
        errorCode: ERROR_CODES.QUIZ_NOT_FOUND,
        errorMessage: getErorrMessage(ERROR_CODES.QUIZ_NOT_FOUND),
        status: HttpStatus.BAD_REQUEST,
      });
    }

    const calculatedScore = this.calculateScore(quiz, data.answers);
    const repositories = [
      this.userQuizSessionRepository,
      this.userScoreRepository,
    ];
    await this.prismaService.transaction(async () => {
      await this.userQuizSessionRepository
        .create({
          quizId: quiz.id,
          userId: userId,
          score: calculatedScore,
          data: {
            answers: data.answers,
          },
        })
        .catch((err) => {
          if (err.code === 'P2002') {
            throw new BusinessException({
              errorCode: ERROR_CODES.ALREADY_SUBMITTED_QUIZ,
              errorMessage: getErorrMessage(ERROR_CODES.ALREADY_SUBMITTED_QUIZ),
              status: HttpStatus.BAD_REQUEST,
            });
          }
          throw err; // rethrow the error
        });

      const userScore = await this.userScoreRepository.addPoint(
        userId,
        calculatedScore,
      );

      await this.updateLeaderBoardProducer.sendMessage({
        userId,
        score: userScore.score,
        cid,
      });
    }, repositories);
  }

  private calculateScore(
    quizFullData: FullQuizRepositoryModel,
    answers: SubmitQuizQuestions,
  ): number {
    let score = 0;
    for (let i = 0; i < quizFullData.quizQuestions.length; i++) {
      const question = quizFullData.quizQuestions[i];
      const answer = answers[question.id];
      if (!answer) {
        throw new BusinessException({
          errorCode: ERROR_CODES.NOT_ENOUGH_ANSWERS,
          errorMessage: getErorrMessage(ERROR_CODES.NOT_ENOUGH_ANSWERS),
          status: HttpStatus.BAD_REQUEST,
        });
      }

      const isCorrect =
        question.quizQuestionOptions.findIndex(
          (o) => o.id === answer && o.isCorrect,
        ) !== -1;
      if (isCorrect) {
        score += question.rewardPoints;
      }
    }

    return score;
  }
}
