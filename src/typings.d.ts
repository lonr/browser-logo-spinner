// https://www.typescriptlang.org/docs/handbook/modules.html#wildcard-module-declarations
// https://github.com/microsoft/TypeScript/issues/2709
declare module "*.svg" {
  var source: string;
  export default source;
}

interface Animation {
  animationName?: string;
}
