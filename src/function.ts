import { renderTitle } from './title';
import { renderType, isOptionalType } from './type';
import { renderDescription } from './description';
import { renderExamples } from './examples';
import { renderAdditionalLinks } from './additionalLinks';
import { renderSubSection } from './subSection';
import { Symbol, TypeChecker, Type, Signature } from 'typescript';

function renderFunctionParameter(parameter: Symbol, typeChecker: TypeChecker): string {
  const name = parameter.getName();
  const declarations = parameter.getDeclarations();

  if (!declarations) {
    throw new Error(`Can't find declaration of parameter ${name}`);
  }

  const type = typeChecker.getTypeAtLocation(declarations[0]);
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
  symbol: Symbol,
  signature: Signature,
  typeChecker: TypeChecker
): string[] {
  const name = symbol.getName();
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
      ...renderFunctionSignature(symbol, signature, typeChecker)
    ],
    []
  );
}
