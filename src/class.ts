import { renderTitle } from './title';
import { renderDescription } from './description';
import { renderExamples } from './examples';
import { renderAdditionalLinks } from './additionalLinks';
import { renderFunctionSignature } from './function';
import { Type, Symbol } from 'typescript';
import { getSymbolsType } from './type';
import { Context } from './context';
import { isInternalSymbol } from './utils';

function renderClassProperty(name: string, method: Symbol, context: Context): string[] {
  const methodType = getSymbolsType(method, context);
  const signatures = methodType.getCallSignatures();

  return signatures.reduce<string[]>(
    (output, signature) => [...output, ...renderFunctionSignature(name, signature, context)],
    []
  );
}

export function renderClass(symbol: Symbol, type: Type, context: Context): string[] {
  const name = symbol.getName();
  const classInstanceName = `${name.charAt(0).toLowerCase() + name.slice(1)}`;
  const properties = type.getProperties().filter(property => !isInternalSymbol(property));

  return [
    ...renderTitle(name),
    ...renderDescription(symbol.getDocumentationComment(context.typeChecker)),
    ...renderExamples(symbol.getJsDocTags()),
    ...renderAdditionalLinks(symbol.getJsDocTags()),
    ...(properties && ['']),
    properties
      .reduce<string[]>(
        (acc, property) => [
          ...acc,
          renderClassProperty(`${classInstanceName}.${property.getName()}`, property, context).join(
            '\n'
          )
        ],
        []
      )
      .join('\n\n')
  ];
}
