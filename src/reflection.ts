import { DeclarationReflection, ReflectionKind } from 'typedoc';
import { renderVariable } from './variable';
import { renderFunction } from './function';
import { renderClass } from './class';
import { renderType } from './type';
import { renderEnumeration } from './enumeration';

export function renderReflection(reflection: DeclarationReflection): string[] {
  switch (reflection.kind) {
    case ReflectionKind.Class:
      return renderClass(reflection);
    case ReflectionKind.Function:
      return renderFunction(reflection);
    case ReflectionKind.Variable:
      return renderVariable(reflection);
    case ReflectionKind.TypeAlias:
      return renderType(reflection);
    case ReflectionKind.Enum:
      return renderEnumeration(reflection);
  }

  /* istanbul ignore next */
  throw new Error(`Not supported reflection kind ${reflection.kindString}`);
}
