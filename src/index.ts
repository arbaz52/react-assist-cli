import fs from "fs";
import path from "path";
import Handlebars from "handlebars";

import fsp from "fs/promises";
import upperFirst from "lodash/upperFirst";

interface FS {
  make: (base: string) => void;
}
interface ITemplateComponent {
  componentName: string;
}
interface ITemplateContext {
  contextName: string;
}

enum ETemplate {
  CONTEXT = "context.tsx.hbs",
  COMPONENT = "component.tsx.hbs",
}
type Structure = (Folder | File<ETemplate>)[];
interface ITemplate {
  [ETemplate.CONTEXT]: ITemplateContext;
  [ETemplate.COMPONENT]: ITemplateComponent;
}

class Folder implements FS {
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

const getTemplate = async <Template>(file: ETemplate) => {
  try {
    const filePath = path.join(__dirname, "..", "templates", file);
    const template = await fsp.readFile(filePath, "utf-8");
    return Handlebars.compile<Template>(template);
  } catch (ex) {
    console.error(ex);
    return "";
  }
};

class File<TemplateType extends ETemplate> implements FS {
  constructor(
    private name: string,
    private templatePath: TemplateType | null = null,
    private templateData: ITemplate[TemplateType] | null = null
  ) {}
  async make(base: string) {
    const folderPath = path.join(base, this.name);
    try {
      let content = "";
      if (this.templatePath && this.templateData) {
        const template = await getTemplate<ITemplate[TemplateType]>(
          this.templatePath
        );
        if (typeof template !== "string") {
          content = template(this.templateData);
        }
      }
      await fsp.writeFile(folderPath, content);
    } catch (ex) {
      console.trace(ex);
    }
  }
}

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
