import { NotifyingHolon } from "./deps.ts";
import { Attribute } from "./functions/Attribute.ts";
export function fbeMetaclass(...properties: (string | Function)[]) {
  return class {
    constructor(...values: any[]) {
      const attributes: string[] = [];
      const methods: NotifyingHolon[] = [];
      for (const [index, property] of properties.entries()) {
        //this[property] = values[index];
        if ((typeof property) === "string") {
          var params: any = { f: Attribute.default(property as string) };
          if (values[index]) {
            params = { ...params, ...values[index] };
          }
          this[property as string] = new NotifyingHolon(params);
          attributes.push(property as string);
        } else if ((typeof property) === "function") {
          var params: any = { f: property };
          if (values[index]) {
            params = { ...params, ...values[index] };
          }
          this[(property as Function).name] = new NotifyingHolon(params);
          methods.push(this[(property as Function).name]);
        } else {
          throw new Error(
            "For the creation of FBEs, it is only allowed to use strings for Attributes and named Functions for Methods.",
          );
        }
      }
      for (const attr of attributes) {
        for (const m of methods) {
          this[attr].connect({ [attr]: m }, ["WEAK"]);
        }
      }
      for (const m of methods) {
        for (const attr of attributes) {
          m.connect({ default: this[attr] });
        }
      }
    }
  };
}
