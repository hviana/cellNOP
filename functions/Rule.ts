import { F, InputMem } from "../deps.ts";
export class Rule {
  static default(im: InputMem, data: { [key: string]: any }): any {
    if (im["default"] === true) {
      data["value"] = crypto.randomUUID();
    }
    return data["value"];
  }
}
