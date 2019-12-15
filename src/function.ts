import { renderType, isOptionalType, getSymbolsType } from './type';
import { renderDescription } from './description';
import { renderExamples } from './examples';
import { renderAdditionalLinks } from './additionalLinks';
import { Symbol, Type, Signature } from 'typescript';
import { Context } from './context';
import { listItem, inlineCode, bolt, heading } from './markdown';

function renderFunctionParameter(parameter: Symbol, context: Context): string {
  const name = parameter.getName();
  const type = getSymbolsType(parameter, context);
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

function renderFunctionParameters(
  parameters: Symbol[],
  context: Context
): string[] {
  if (!parameters.length) {
    return [];
  }

  return [
    bolt('Parameters'),
    parameters
      .map(parameter => renderFunctionParameter(parameter, context))
      .join('\n')
  ];
}

export function renderFunctionSignature(
  name: string,
  signature: Signature,
  context: Context
): string {
  const parameters = signature.getParameters();
  const typeParameters = (signature.getTypeParameters() || [])
    .map(typeParameter => typeParameter.symbol.name)
    .join(', ');

  return [
    heading(
      `${name}${
        typeParameters ? `\\<${typeParameters}\\>` : ''
      }(${parameters.map(({ name }) => name).join(', ')})`
    ),
    ...renderDescription(
      signature.getDocumentationComment(context.typeChecker)
    ),
    ...renderFunctionParameters(parameters, context),
    bolt('Returns'),
    inlineCode(renderType(signature.getReturnType(), context)),
    ...renderExamples(signature.getJsDocTags()),
    ...renderAdditionalLinks(signature.getJsDocTags())
  ].join('\n\n');
}

export function renderFunction(
  symbol: Symbol,
  type: Type,
  context: Context
): string {
  const signatures = type.getCallSignatures();
  return signatures
    .map<string>(signature =>
      renderFunctionSignature(symbol.getName(), signature, context)
    )
    .join('\n\n');
}
