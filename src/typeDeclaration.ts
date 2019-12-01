import { renderTitle } from './title';
import { renderDescription } from './description';
import { renderExamples } from './examples';
import { renderAdditionalLinks } from './additionalLinks';
import { renderSubSection } from './subSection';
import { renderType, getSymbolsType, isOptionalType } from './type';
import { Symbol, Type, TypeChecker, TypeFlags } from 'typescript';

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

function renderTypeDefinition(type: Type, typeChecker: TypeChecker): string[] {
  const flags = type.getFlags();

  if (flags & TypeFlags.Object) {
    return renderTypeProperties(type.getProperties(), typeChecker);
  }

  throw new Error(`Not supported type ${typeChecker.typeToString(type)}`);
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
