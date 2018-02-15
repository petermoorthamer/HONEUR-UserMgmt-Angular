export class Utilities {

  public static endsWith(str: String, endStr: String): boolean {
    return str.length >= endStr.length && str.substr(str.length - endStr.length) == endStr;
  }

}
