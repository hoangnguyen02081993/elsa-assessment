import { IsObject, IsString } from 'class-validator';

export class SubmitQuizQuestions {
  [key: string]: string;
}

export class SubmitQuizSessionRequest {
  @IsString()
  quizCode: string;

  @IsObject()
  answers: SubmitQuizQuestions;
}
