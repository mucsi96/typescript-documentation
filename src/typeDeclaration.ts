import { renderTitle } from './title';
import { renderDescription } from './description';
import { renderExamples } from './examples';
import { renderAdditionalLinks } from './additionalLinks';
import { renderSubSection } from './subSection';
import { renderType, getSymbolsType, isOptionalType } from './type';
import { Symbol, Type, TypeChecker, TypeFlags } from 'typescript';
import { findExactMatchingTypeFlag, inspectObject } from './utils';

function renderTypeProperty(property: Symbol, typeChecker: TypeChecker): string {
  const name = property.getName();
  const type = getSymbolsType(property, typeChecker);
  return `- \`${name}${isOptionalType(type) ? '?' : ''}: ${renderType(type, typeChecker)}\``;
}

function renderTypeProperties(properties: Symbol[], typeChecker: TypeChecker): string[] {
  if (!properties.length) {
    return [];
  }

  return [
    ...renderSubSection('Properties'),
    ...properties.map(property => renderTypeProperty(property, typeChecker))
  ];
}

function renderTypeValues(types: Type[], typeChecker: TypeChecker): string[] {
  if (!types.length) {
    return [];
  }

  return [
    ...renderSubSection('Possible values'),
    ...types.map(type => `- \`${renderType(type, typeChecker)}\``)
  ];
}

function renderTypeDefinition(type: Type, typeChecker: TypeChecker): string[] {
  const flags = type.getFlags();
  const name = type.symbol && type.symbol.getName();

  /* istanbul ignore else */
  if (flags & TypeFlags.Object) {
    return renderTypeProperties(type.getProperties(), typeChecker);
  }

  if (type.isUnion()) {
    return renderTypeValues(type.types, typeChecker);
  }

  /* istanbul ignore next */
  throw new Error(
    `Not supported type definition ${inspectObject(type)} with flags "${findExactMatchingTypeFlag(
      flags
    )}"`
  );
}

export function renderTypeDeclaration(
  symbol: Symbol,
  type: Type,
  typeChecker: TypeChecker
): string[] {
  return [
    ...renderTitle(symbol.getName()),
    ...renderDescription(symbol.getDocumentationComment(typeChecker)),
    ...renderTypeDefinition(type, typeChecker),
    ...renderExamples(symbol.getJsDocTags()),
    ...renderAdditionalLinks(symbol.getJsDocTags())
  ];
}
