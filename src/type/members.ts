import { Type, Symbol, __String, SymbolFlags } from 'typescript';
import { Context } from '../context';
import { getSymbolsType } from './utils';
import { joinLines, listItem } from '../markdown';
import { renderType } from '.';

function getTypeMembers(
  type: Type,
  context: Context
): { name?: string; type: Type }[] {
  if (type.symbol && type.symbol.members) {
    const membersList: { name: string; type: Type }[] = [];

    type.symbol.members.forEach((value: Symbol, key: __String) => {
      if (value.flags & SymbolFlags.TypeParameter) {
        return;
      }

      membersList.push({
        name: key.toString(),
        type: getSymbolsType(value, context)
      });
    });

    return membersList;
  }

  if (type.isUnion()) {
    return type.types.map(type => ({ type }));
  }

  return [];
}

export function renderTypeMembers(
  type: Type,
  context: Context,
  nestingLevel = 1
): string {
  return joinLines(
    getTypeMembers(type, context).map(({ name, type }) =>
      listItem(
        renderType(type, context, {
          name,
          nestingLevel: nestingLevel + 1
        }),
        nestingLevel
      )
    )
  );
}
