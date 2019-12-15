import { renderType } from './type';
import { renderDescription } from './description';
import { renderExamples } from './examples';
import { renderAdditionalLinks } from './additionalLinks';
import { Symbol, Type, Signature } from 'typescript';
import { Context } from './context';
import {
  listItem,
  subSection,
  heading,
  joinLines,
  joinSections
} from './markdown';
import { getSymbolsType } from './type/utils';

function renderFunctionParameter(parameter: Symbol, context: Context): string {
  const name = parameter.getName();
  const type = getSymbolsType(parameter, context);
  return listItem(renderType(type, context, { name, nestingLevel: 2 }));
}

function renderFunctionParameters(
  parameters: Symbol[],
  context: Context
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
  context: Context
): string {
  const parameters = signature.getParameters();
  const typeParameters = (signature.getTypeParameters() || [])
    .map(typeParameter => typeParameter.symbol.name)
    .join(', ');

  return joinSections([
    heading(
      `${name}${
        typeParameters ? `\\<${typeParameters}\\>` : ''
      }(${parameters.map(({ name }) => name).join(', ')})`
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
  context: Context
): string {
  return joinSections(
    type
      .getCallSignatures()
      .map<string>(signature =>
        renderFunctionSignature(symbol.getName(), signature, context)
      )
  );
}
