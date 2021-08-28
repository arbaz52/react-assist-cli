import fs from "fs";
import path from "path";

import fsp from "fs/promises";
import upperFirst from "lodash/upperFirst";

import Folder from "./Folder";
import File, { ETemplate } from "./File";

const getComponentDirectory = (name: string) => {
  return new Folder(name, [
    new File("types.ts"),
    new File("index.tsx", ETemplate.COMPONENT, {
      componentName: upperFirst(name),
    }),
    new File("index.styled.ts"),
  ]);
};

const getContextDirectory = (name: string) => {
  return new Folder(name, [
    new File("types.ts"),
    new File("index.tsx", ETemplate.CONTEXT, {
      contextName: upperFirst(name),
    }),
  ]);
};

const src = new Folder("src", [
  new Folder("components", [getComponentDirectory("app")]),
  new Folder("contexts", [getContextDirectory("testContext")]),
]);

const __main__ = async () => {
  const basePath = path.join(process.cwd(), "test");
  console.debug(fs.existsSync(basePath));
  if (fs.existsSync(basePath)) await fsp.rm(basePath, { recursive: true });

  fsp.mkdir(basePath);
  src.make(basePath);
};

__main__();
