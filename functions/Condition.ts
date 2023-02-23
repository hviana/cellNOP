import { F, InputMem } from "../deps.ts";
export class Condition {
  static or(im: InputMem, data: { [key: string]: any }): any {
    var res: boolean = false;
    for (const path in im) {
      res = res || !!im[path];
    }
    return res;
  }
  static and(im: InputMem, data: { [key: string]: any }): any {
    var res: boolean = true;
    for (const path in im) {
      res = res && !!im[path];
    }
    return res;
  }
  static not(im: InputMem, data: { [key: string]: any }): any {
    return !im["default"];
  }
  static xor(im: InputMem, data: { [key: string]: any }): any {
    const keys: string[] = Object.keys(im);
    var res = im[keys[0]];
    for (var i = 1; i < keys.length; i++) {
      res = res ^ im[keys[i]];
    }
    return res;
  }
}
