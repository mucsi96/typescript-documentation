import { Type, TypeChecker, TypeFlags } from 'typescript';

export function render(type: Type, typeChecker: TypeChecker): string {
  if (type.getFlags() | TypeFlags.Number) {
    return 'number';
  }

  // if (type instanceof IntrinsicType) {
  //   return type.name;
  // }
  // /* istanbul ignore else */
  // if (type instanceof UnionType) {
  //   return type.types
  //     .map(type => render(type))
  //     .filter(name => name !== 'undefined' && name !== 'false')
  //     .join(' | ');
  // }

  /* istanbul ignore next */
  throw new Error(`Not supported type ${typeChecker.typeToString(type)}`);
}
