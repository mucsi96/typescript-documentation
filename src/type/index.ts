import { Type, ObjectFlags, TypeReference } from 'typescript';
import { Context } from '../context';
import { joinLines } from '../markdown';
import { TypeContext } from './context';
import { renderTypeDeclaration } from './declaration';
import { renderTypeMembers } from './members';
import { getNonOptionalType } from './utils';

function hasMembers(type: Type): boolean {
  const objectFlags = (type as TypeReference).objectFlags;

  return (
    !type.aliasSymbol &&
    !!(
      objectFlags & ObjectFlags.Anonymous || objectFlags & ObjectFlags.Interface
    )
  );
}

export function renderType(
  type: Type,
  context: Context,
  typeContext: TypeContext = {}
): string {
  const nonOptionalType = getNonOptionalType(type);

  return joinLines([
    renderTypeDeclaration(type, context, typeContext),
    hasMembers(nonOptionalType)
      ? renderTypeMembers(nonOptionalType, context, typeContext.nestingLevel)
      : ''
  ]);
}
