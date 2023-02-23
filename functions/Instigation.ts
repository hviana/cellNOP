import { F, InputMem } from "../deps.ts";
export class Instigation {
  static default(im: InputMem, data: { [key: string]: any }): any {
    return im["default"];
  }
}
