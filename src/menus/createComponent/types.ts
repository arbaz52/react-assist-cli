export enum EQuestionName {
  COMPONENT_NAME = "What would you like to name the component?",
}

export interface IAnswers {
  [EQuestionName.COMPONENT_NAME]: string;
}
