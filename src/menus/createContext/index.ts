import inquirer from "inquirer";

import { getContextDirectory } from "./utils";
import { getBasePath } from "../../utils";

import { EQuestionName, IAnswers } from "./types";

const createContextMenu = async () => {
  const answers = await inquirer.prompt<IAnswers>([
    {
      name: EQuestionName.CONTEXT_NAME,
      message: EQuestionName.CONTEXT_NAME,
      type: "input",
    },
  ]);

  const dir = getContextDirectory(answers[EQuestionName.CONTEXT_NAME]);
  dir.make(getBasePath());
};

export default createContextMenu;
