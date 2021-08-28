import inquirer from "inquirer";
import createComponentMenu from "../createComponent";
import createContextMenu from "../createContext";

import { EQuestionName, EWhatToDoOptions, IAnswers } from "./types";

const mainMenu = async () => {
  const answers = await inquirer.prompt<IAnswers>([
    {
      name: EQuestionName.WHAT_TO_DO,
      message: EQuestionName.WHAT_TO_DO,
      type: "list",
      choices: Object.keys(EWhatToDoOptions).map(
        (entry) =>
          Object.values(EWhatToDoOptions)[
            Object.keys(EWhatToDoOptions).indexOf(entry)
          ]
      ),
    },
  ]);

  switch (answers[EQuestionName.WHAT_TO_DO]) {
    case EWhatToDoOptions.CREATE_COMPONENT: {
      await createComponentMenu();
      break;
    }
    case EWhatToDoOptions.CREATE_CONTEXT: {
      await createContextMenu();
      break;
    }
  }
};

export default mainMenu;
