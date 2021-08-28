import path from "path";

import upperFirst from "lodash/upperFirst";

import Folder from "./Folder";
import File, { ETemplate } from "./File";

export const getComponentDirectory = (name: string) => {
  return new Folder(name, [
    new File("types.ts"),
    new File("index.tsx", ETemplate.COMPONENT, {
      componentName: upperFirst(name),
    }),
    new File("index.styled.ts"),
  ]);
};

export const getContextDirectory = (name: string) => {
  return new Folder(name, [
    new File("types.ts"),
    new File("index.tsx", ETemplate.CONTEXT, {
      contextName: upperFirst(name),
    }),
  ]);
};

export const getTestFolderPath = () =>
  path.join(path.dirname(require.main?.filename ?? ""), "..", "test");
