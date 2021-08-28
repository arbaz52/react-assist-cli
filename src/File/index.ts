import path from "path";

import fsp from "fs/promises";

import { getTemplate } from "./utils";

import { FS } from "../types";
import { ETemplate, ITemplate } from "./types";

export * from "./types";

export default class File<TemplateType extends ETemplate> implements FS {
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
