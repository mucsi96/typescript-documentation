import { renderDescription } from './description';
import { renderExamples } from './examples';
import { renderAdditionalLinks } from './additionalLinks';
import { renderFunctionSignature } from './function';
import { Type, Symbol } from 'typescript';
import { Context } from './context';
import { isInternalSymbol } from './utils';
import { heading, joinSections } from './markdown';
import { getSymbolsType, isFunctionSymbol } from './type/utils';

function renderClassMethod(
  name: string,
  method: Symbol,
  context: Context
): string {
  const methodType = getSymbolsType(method, context);
  const signatures = methodType.getCallSignatures();

  return signatures
    .map(signature => renderFunctionSignature(name, signature, context))
    .join('\n\n');
}

function renderClassMethods(
  classInstanceName: string,
  properties: Symbol[],
  context: Context
): string {
  return joinSections(
    properties.map(property =>
      renderClassMethod(
        `${classInstanceName}.${property.getName()}`,
        property,
        context
      )
    )
  );
}

export function renderClass(
  symbol: Symbol,
  type: Type,
  context: Context
): string {
  const name = symbol.getName();
  const methods = type
    .getProperties()
    .filter(
      property =>
        isFunctionSymbol(property, context) && !isInternalSymbol(property)
    );

  return joinSections([
    heading(name),
    renderDescription(symbol.getDocumentationComment(context.typeChecker)),
    renderExamples(symbol.getJsDocTags()),
    renderAdditionalLinks(symbol.getJsDocTags()),
    renderClassMethods(
      `${name.charAt(0).toLowerCase() + name.slice(1)}`,
      methods,
      context
    )
  ]);
}
