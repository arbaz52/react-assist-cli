import fs from "fs";
import path from "path";

import fsp from "fs/promises";

import { FS, Structure } from "../types";

export default class Folder implements FS {
  constructor(private name: string, private structure: Structure) {}

  async make(base: string) {
    const folderPath = path.join(base, this.name);
    try {
      if (!fs.existsSync(folderPath)) {
        await fsp.mkdir(folderPath);
      }
      this.structure.forEach((entry) => {
        entry.make(folderPath);
      });
    } catch (ex) {
      console.trace(ex);
    }
  }
}
