import { QuizQuestionOptions, QuizQuestions, Quizzes } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

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
  profile?: {
    userId: string;
    isCompleted: boolean;
    score?: number;
    completedAt?: Date;
  };
}

export class GetsRequest {
  @IsNotEmpty()
  @Transform(({ value }) => value === 'true')
  includeProfile: boolean;
}

export type FullGetQuizResponseData = FullQuizRepositoryModel & {
  profile?: {
    userId: string;
    isCompleted: boolean;
    score?: number;
    completedAt?: Date;
  };
};
