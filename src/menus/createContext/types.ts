export enum EQuestionName {
  CONTEXT_NAME = "What would you like to name the context? (We'll add `Context` as suffix)",
}

export interface IAnswers {
  [EQuestionName.CONTEXT_NAME]: string;
}
