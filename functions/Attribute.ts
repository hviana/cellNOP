import { F, InputMem } from "../deps.ts";
export class Attribute {
  static default(name: string): F {
    return function (im: InputMem, data: { [key: string]: any }): any {
      if ((typeof im["default"]) === "object") {
        if (name in im["default"]) {
          data["value"] = im["default"][name];
        }
      }
      return data["value"];
    };
  }
}
