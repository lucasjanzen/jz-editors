export class JZHelper {
  static isEqual(value1: any, value2: any) {
    return JSON.stringify(value1) === JSON.stringify(value2);
  }
}
