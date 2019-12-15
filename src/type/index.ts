import { Type, ObjectFlags, TypeReference } from 'typescript';
import { Context } from '../context';
import { joinLines } from '../markdown';
import { TypeContext } from './context';
import { renderTypeDeclaration } from './declaration';
import { renderTypeMembers } from './members';

function hasMembers(type: Type): boolean {
  const objectFlags = (type as TypeReference).objectFlags;

  return (
    !type.aliasSymbol &&
    !!(
      (
        objectFlags & ObjectFlags.Anonymous ||
        objectFlags & ObjectFlags.Interface
      ) //||
      // objectFlags & ObjectFlags.Reference
    )
  );
}

export function renderType(
  type: Type,
  context: Context,
  typeContext: TypeContext = {}
): string {
  return joinLines([
    renderTypeDeclaration(type, context, typeContext),
    hasMembers(type)
      ? renderTypeMembers(type, context, typeContext.nestingLevel)
      : ''
  ]);
}
