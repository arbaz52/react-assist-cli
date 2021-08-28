export enum EQuestionName {
  WHAT_TO_DO = "What would you like to do?",
}

export enum EWhatToDoOptions {
  CREATE_COMPONENT = "Create Component",
  CREATE_CONTEXT = "Create Context",
}

export interface IAnswers {
  [EQuestionName.WHAT_TO_DO]: EWhatToDoOptions;
}
