import Folder from "./Folder";
import File, { ETemplate } from "./File";

export interface FS {
  make: (base: string) => void;
}

export type Structure = (Folder | File<ETemplate>)[];
