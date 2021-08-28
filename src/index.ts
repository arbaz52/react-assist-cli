import fs from "fs";
import path from "path";

import fsp from "fs/promises";

import Folder from "./Folder";
import { getComponentDirectory, getContextDirectory } from "./utils";

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
