import path from "path";
import Handlebars from "handlebars";

import fsp from "fs/promises";

import { ETemplate } from "./types";

export const getTemplate = async <Template>(file: ETemplate) => {
  try {
    const filePath = path.join(__dirname, "..", "templates", file);
    const template = await fsp.readFile(filePath, "utf-8");
    return Handlebars.compile<Template>(template);
  } catch (ex) {
    console.error(ex);
    return "";
  }
};
