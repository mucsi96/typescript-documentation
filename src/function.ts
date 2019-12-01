import { renderTitle } from './title';
import { renderType, isOptionalType, getSymbolsType } from './type';
import { renderDescription } from './description';
import { renderExamples } from './examples';
import { renderAdditionalLinks } from './additionalLinks';
import { renderSubSection } from './subSection';
import { Symbol, TypeChecker, Type, Signature } from 'typescript';

function renderFunctionParameter(parameter: Symbol, typeChecker: TypeChecker): string {
  const name = parameter.getName();
  const type = getSymbolsType(parameter, typeChecker);
  return `- \`${name}${isOptionalType(type) ? '?' : ''}: ${renderType(type, typeChecker)}\``;
}

function renderFunctionParameters(parameters: Symbol[], typeChecker: TypeChecker): string[] {
  if (!parameters.length) {
    return [];
  }

  return [
    ...renderSubSection('Parameters'),
    ...parameters.map(parameter => renderFunctionParameter(parameter, typeChecker))
  ];
}

export function renderFunctionSignature(
  name: string,
  signature: Signature,
  typeChecker: TypeChecker
): string[] {
  const parameters = signature.getParameters();

  return [
    ...renderTitle(`${name}(${parameters.map(({ name }) => name).join(', ')})`),
    ...renderDescription(signature.getDocumentationComment(typeChecker)),
    ...renderFunctionParameters(parameters, typeChecker),
    ...renderSubSection('Returns'),
    `\`${renderType(signature.getReturnType(), typeChecker)}\``,
    ...renderExamples(signature.getJsDocTags()),
    ...renderAdditionalLinks(signature.getJsDocTags()),
    ''
  ];
}

export function renderFunction(symbol: Symbol, type: Type, typeChecker: TypeChecker): string[] {
  const signatures = type.getCallSignatures();
  return signatures.reduce<string[]>(
    (output, signature): string[] => [
      ...output,
      ...renderFunctionSignature(symbol.getName(), signature, typeChecker)
    ],
    []
  );
}
