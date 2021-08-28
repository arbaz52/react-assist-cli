import { upperFirst } from "lodash";

import Folder from "@src/Folder";
import File, { ETemplate } from "@src/File";

// TODO: move these to respective menus
export const getComponentDirectory = (name: string) => {
  return new Folder(name, [
    new File("types.ts"),
    new File("index.tsx", ETemplate.COMPONENT, {
      componentName: upperFirst(name),
    }),
    new File("index.styled.ts"),
  ]);
};
