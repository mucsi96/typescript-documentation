import { Signature, Symbol, Type } from 'typescript';
import { renderAdditionalLinks } from './additionalLinks';
import { DependencyContext, RenderContext } from './context';
import { renderDescription } from './description';
import { renderExamples } from './examples';
import {
  heading,
  joinLines,
  joinSections,
  listItem,
  subSection
} from './markdown';
import { getSymbolDependencies } from './symbol';
import { getTypeDependencies, renderType } from './type';
import { getSymbolsType } from './type/utils';

export function getFunctionDependencies(
  type: Type,
  context: DependencyContext
): Symbol[] {
  return type
    .getCallSignatures()
    .reduce<Symbol[]>((dependencies, signature) => {
      const parameterDependencies = signature
        .getParameters()
        .reduce<Symbol[]>(
          (dependencies, parameter) => [
            ...dependencies,
            ...getSymbolDependencies(parameter, context)
          ],
          []
        );

      const returnType = signature.getReturnType();
      const returnTypeSymbol = returnType.getSymbol();

      return [
        ...dependencies,
        ...(returnTypeSymbol
          ? getTypeDependencies(returnTypeSymbol, returnType, context)
          : []),
        ...parameterDependencies
      ];
    }, []);
}

function renderFunctionParameter(
  parameter: Symbol,
  context: RenderContext
): string {
  const name = parameter.getName();
  const type = getSymbolsType(parameter, context.typeChecker);
  return listItem(renderType(type, context, { name, nestingLevel: 2 }));
}

function renderFunctionParameters(
  parameters: Symbol[],
  context: RenderContext
): string {
  if (!parameters.length) {
    return '';
  }

  return joinSections([
    subSection('Parameters'),
    joinLines(
      parameters.map(parameter => renderFunctionParameter(parameter, context))
    )
  ]);
}

export function renderFunctionSignature(
  name: string,
  signature: Signature,
  context: RenderContext
): string {
  const parameters = signature.getParameters();
  const typeParameters = (signature.getTypeParameters() || [])
    .map(typeParameter => typeParameter.symbol.name)
    .join(', ');

  return joinSections([
    heading(
      `${name}${
        typeParameters ? `\\<${typeParameters}\\>` : ''
      }(${parameters.map(({ name }) => name).join(', ')})`,
      2
    ),
    renderDescription(signature.getDocumentationComment(context.typeChecker)),
    renderFunctionParameters(parameters, context),
    subSection('Returns'),
    renderType(signature.getReturnType(), context),
    renderExamples(signature.getJsDocTags()),
    renderAdditionalLinks(signature.getJsDocTags())
  ]);
}

export function renderFunction(
  symbol: Symbol,
  type: Type,
  context: RenderContext
): string {
  const name = symbol.getName();
  return joinSections(
    type
      .getCallSignatures()
      .map<string>(signature =>
        renderFunctionSignature(name, signature, context)
      )
  );
}
