import upperFirst from "lodash/upperFirst";

import Folder from "@src/Folder";
import File, { ETemplate } from "@src/File";

export const getContextDirectory = (name: string) => {
  return new Folder(name, [
    new File("types.ts"),
    new File("index.tsx", ETemplate.CONTEXT, {
      contextName: upperFirst(name),
    }),
  ]);
};
