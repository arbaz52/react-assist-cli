import { upperFirst } from "lodash";

import Folder from "@src/Folder";
import File, { ETemplate } from "@src/File";

// TODO: move these to respective menus
export const getComponentDirectory = (name: string) => {
  const componentName = upperFirst(name);
  return new Folder(name, [
    new File("index.tsx", ETemplate.COMPONENT, {
      componentName,
    }),
    new File("types.ts", ETemplate.COMPONENT_TYPES, {
      componentName,
    }),
    new File("index.styled.ts", ETemplate.COMPONENT_STYLES, {}),
  ]);
};
