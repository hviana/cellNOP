import { F, InputMem } from "../deps.ts";
export class Premise {
  static is(im: InputMem, data: { [key: string]: any }): any {
    return im["left"] == im["right"];
  }
  static exists(im: InputMem, data: { [key: string]: any }): any {
    for (const val of im["left"]) {
      if (val == im["right"]) {
        return true;
      }
    }
    return false;
  }
  static notExists(im: InputMem, data: { [key: string]: any }): any {
    return !Premise.exists(im, data);
  }
  static includes(im: InputMem, data: { [key: string]: any }): any {
    return im["left"].includes(im["right"]);
  }
  static notIncludes(im: InputMem, data: { [key: string]: any }): any {
    return !Premise.includes(im, data);
  }
  static isNot(im: InputMem, data: { [key: string]: any }): any {
    return !Premise.is(im, data);
  }
  static biggerThan(im: InputMem, data: { [key: string]: any }): any {
    return im["left"] > im["right"];
  }
  static lessThanOrEqual(im: InputMem, data: { [key: string]: any }): any {
    return !Premise.biggerThan(im, data);
  }
  static lessThan(im: InputMem, data: { [key: string]: any }): any {
    return im["left"] < im["right"];
  }
  static biggerThanOrEqual(im: InputMem, data: { [key: string]: any }): any {
    return !Premise.lessThan(im, data);
  }
  static leftIncludes(value: any): F {
    return function (im: InputMem, data: { [key: string]: any }): any {
      return im["left"].includes(value);
    };
  }
  static leftNotIncludes(value: any): F {
    return function (im: InputMem, data: { [key: string]: any }): any {
      return !Premise.leftIncludes(value)(im, data);
    };
  }
  static leftIs(value: any): F {
    return function (im: InputMem, data: { [key: string]: any }): any {
      return im["left"] == value;
    };
  }
  static leftIsNot(value: any): F {
    return function (im: InputMem, data: { [key: string]: any }): any {
      return !Premise.leftIs(value)(im, data);
    };
  }
  static leftIsbiggerThan(value: any): F {
    return function (im: InputMem, data: { [key: string]: any }): any {
      return im["left"] > value;
    };
  }
  static leftIslessThanOrEqual(value: any): F {
    return function (im: InputMem, data: { [key: string]: any }): any {
      return !Premise.leftIsbiggerThan(value)(im, data);
    };
  }
  static leftIslessThan(value: any): F {
    return function (im: InputMem, data: { [key: string]: any }): any {
      return im["left"] < value;
    };
  }
  static leftIsbiggerThanOrEqual(value: any): F {
    return function (im: InputMem, data: { [key: string]: any }): any {
      return !Premise.leftIslessThan(value)(im, data);
    };
  }
  static searchInLeft(func: Function): F {
    return async function (
      im: InputMem,
      data: { [key: string]: any },
    ): Promise<any> {
      for (const val of im["left"]) {
        if (await func(val)) {
          return true;
        }
      }
      return false;
    };
  }
  static notSearchInLeft(func: Function): F {
    return async function (
      im: InputMem,
      data: { [key: string]: any },
    ): Promise<any> {
      return !Premise.searchInLeft(func)(im, data);
    };
  }
}
