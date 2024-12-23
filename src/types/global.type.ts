import { RequestContext } from 'src/models';
import { SubmitQuizQuestions } from 'src/modules/quiz/models/quiz-session';

declare global {
  // eslint-disable-next-line  @typescript-eslint/no-namespace
  namespace Express {
    export interface Request {
      context: RequestContext;
      rawBody: Buffer;
    }
  }

  // eslint-disable-next-line  @typescript-eslint/no-namespace
  namespace PrismaJson {
    export interface QuizSessionData {
      answers: SubmitQuizQuestions;
    }
  }
}
