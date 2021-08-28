import inquirer from "inquirer";

import { getBasePath } from "../../utils";
import { getComponentDirectory } from "./utils";

import { EQuestionName, IAnswers } from "./types";

const createComponentMenu = async () => {
  const answers = await inquirer.prompt<IAnswers>([
    {
      name: EQuestionName.COMPONENT_NAME,
      message: EQuestionName.COMPONENT_NAME,
      type: "input",
    },
  ]);

  const dir = getComponentDirectory(answers[EQuestionName.COMPONENT_NAME]);
  dir.make(getBasePath());
};

export default createComponentMenu;
