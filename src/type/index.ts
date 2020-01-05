import {
  ObjectFlags,
  Symbol,
  SymbolFlags,
  Type,
  TypeReference
} from 'typescript';
import { DependencyContext, RenderContext } from '../context';
import { joinLines } from '../markdown';
import { getSymbolDependencies } from '../symbol';
import { TypeContext } from './context';
import { renderTypeDeclaration } from './declaration';
import { getTypeMembers, renderTypeMembers } from './members';
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

function isTransientType(type: Type): boolean {
  const symbol = type.getSymbol();

  if (!symbol) {
    return false;
  }

  return !!(symbol.getFlags() & SymbolFlags.Transient);
}

export function getTypeDependencies(
  type: Type,
  context: DependencyContext
): Symbol[] {
  const typeReference = type as TypeReference;
  const typeArguments = typeReference.typeArguments || [];
  const typeArgumetDependencies = typeArguments.reduce<Symbol[]>(
    (dependnecies, typeArgument) => {
      const symbol = typeArgument.getSymbol();

      return [
        ...dependnecies,
        ...(symbol ? getSymbolDependencies(symbol, context) : [])
      ];
    },
    []
  );

  const memberDependencies = isTransientType(type)
    ? []
    : getTypeMembers(type, context.typeChecker).reduce<Symbol[]>(
        (dependnecies, { type }) => {
          const symbol = type.getSymbol();

          return [
            ...dependnecies,
            ...(symbol ? getSymbolDependencies(symbol, context) : [])
          ];
        },
        []
      );

  return [
    ...(type.aliasSymbol && context.exportedSymbols.includes(type.aliasSymbol)
      ? [type.aliasSymbol, ...getSymbolDependencies(type.aliasSymbol, context)]
      : []),
    ...typeArgumetDependencies,
    ...memberDependencies
  ];
}

export function renderType(
  type: Type,
  context: RenderContext,
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
