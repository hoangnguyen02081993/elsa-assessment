import { QuizQuestionOptions, QuizQuestions, Quizzes } from '@prisma/client';

export type FullQuizQuestionRepositoryModel = QuizQuestions & {
  quizQuestionOptions?: QuizQuestionOptions[];
};

export type FullQuizRepositoryModel = Quizzes & {
  quizQuestions?: FullQuizQuestionRepositoryModel[];
};

export class QuizQuestionOptionDto {
  id: string;
  text: string;
}

export class QuizQuestionDto {
  id: string;
  text: string;
  options: QuizQuestionOptionDto[];
}

export class QuizDto {
  id: string;
  code: string;
  name: string;
  questions: QuizQuestionDto[];
}
