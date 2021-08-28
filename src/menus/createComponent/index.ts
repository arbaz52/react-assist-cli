import inquirer from "inquirer";
import { getComponentDirectory, getTestFolderPath } from "../../utils";
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
  dir.make(getTestFolderPath());
};

export default createComponentMenu;
