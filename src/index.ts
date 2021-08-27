import fs from "fs";
import path from "path";

import fsp from "fs/promises";

type Structure = (Folder | File)[];

interface FS {
  make: (base: string) => void;
}

class Folder implements FS {
  constructor(private name: string, private structure: Structure) {}

  async make(base: string) {
    const folderPath = path.join(base, this.name);
    try {
      await fsp.mkdir(folderPath);
      this.structure.forEach((entry) => {
        entry.make(folderPath);
      });
    } catch (ex) {
      console.trace(ex);
    }
  }
}

class File implements FS {
  constructor(private name: string, private template: string | null = null) {}
  async make(base: string) {
    const folderPath = path.join(base, this.name);
    try {
      await fsp.writeFile(folderPath, "");
    } catch (ex) {
      console.trace(ex);
    }
  }
}

const src = new Folder("src", [
  new Folder("components", [
    new Folder("App", [
      new File("types.ts"),
      new File("index.tsx"),
      new File("index.styled.ts"),
    ]),
  ]),
  new Folder("contexts", []),
]);

const __main__ = async () => {
  const basePath = path.join(process.cwd(), "test");
  console.debug(fs.existsSync(basePath));
  if (fs.existsSync(basePath)) await fsp.rm(basePath, { recursive: true });

  fsp.mkdir(basePath);
  src.make(basePath);
};

__main__();
