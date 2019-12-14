import { renderDescription } from './description';
import { renderExamples } from './examples';
import { renderAdditionalLinks } from './additionalLinks';
import { renderType, getSymbolsType, isOptionalType } from './type';
import { Symbol, Type, TypeFlags } from 'typescript';
import { findExactMatchingTypeFlag, inspectObject } from './utils';
import { Context } from './context';
import { subSection, listItem, inlineCode, heading } from './markdown';

function renderTypeProperty(property: Symbol, context: Context): string {
  const name = property.getName();
  const type = getSymbolsType(property, context);

  return listItem(
    inlineCode(
      [
        name,
        isOptionalType(type) ? '?' : '',
        ': ',
        renderType(type, context)
      ].join('')
    )
  );
}

function renderTypeProperties(
  properties: Symbol[],
  context: Context
): string[] {
  if (!properties.length) {
    return [];
  }

  return [
    subSection('Properties'),
    ...properties.map(property => renderTypeProperty(property, context))
  ];
}

function renderTypeValues(types: Type[], context: Context): string[] {
  if (!types.length) {
    return [];
  }

  return [
    subSection('Possible values'),
    ...types.map(type => listItem(inlineCode(renderType(type, context))))
  ];
}

function renderTypeDefinition(type: Type, context: Context): string[] {
  const flags = type.getFlags();

  if (flags & TypeFlags.Object) {
    return renderTypeProperties(type.getProperties(), context);
  }

  /* istanbul ignore else */
  if (type.isUnion()) {
    return renderTypeValues(type.types, context);
  }

  /* istanbul ignore next */
  throw new Error(
    `Not supported type definition ${inspectObject(
      type
    )} with flags "${findExactMatchingTypeFlag(flags)}"`
  );
}

export function renderTypeDeclaration(
  symbol: Symbol,
  type: Type,
  context: Context
): string[] {
  return [
    heading(symbol.getName()),
    ...renderDescription(symbol.getDocumentationComment(context.typeChecker)),
    ...renderTypeDefinition(type, context),
    ...renderExamples(symbol.getJsDocTags()),
    ...renderAdditionalLinks(symbol.getJsDocTags())
  ];
}
