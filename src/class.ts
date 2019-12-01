import { renderTitle } from './title';
import { renderDescription } from './description';
import { renderExamples } from './examples';
import { renderAdditionalLinks } from './additionalLinks';
import { renderFunctionSignature } from './function';
import { Type, TypeChecker, Symbol } from 'typescript';
import { getSymbolsType } from './type';

function renderClassMethod(name: string, method: Symbol, typeChecker: TypeChecker): string[] {
  const methodType = getSymbolsType(method, typeChecker);
  const signatures = methodType.getCallSignatures();

  return signatures.reduce<string[]>(
    (output, signature) => [...output, ...renderFunctionSignature(name, signature, typeChecker)],
    []
  );
}

export function renderClass(symbol: Symbol, type: Type, typeChecker: TypeChecker): string[] {
  const name = symbol.getName();
  const classInstanceName = `${name.charAt(0).toLowerCase() + name.slice(1)}`;
  const methods = type.getProperties();

  return [
    ...renderTitle(name),
    ...renderDescription(symbol.getDocumentationComment(typeChecker)),
    ...renderExamples(symbol.getJsDocTags()),
    ...renderAdditionalLinks(symbol.getJsDocTags()),
    '',
    ...methods.reduce<string[]>(
      (acc, method) => [
        ...acc,
        ...renderClassMethod(`${classInstanceName}.${method.getName()}`, method, typeChecker)
      ],
      []
    )
  ];
}
