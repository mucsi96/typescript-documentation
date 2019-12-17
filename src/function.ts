import { Signature, Symbol, Type } from 'typescript';
import { renderAdditionalLinks } from './additionalLinks';
import { Context } from './context';
import { renderDescription } from './description';
import { renderExamples } from './examples';
import {
  heading,
  joinLines,
  joinSections,
  listItem,
  subSection
} from './markdown';
import { renderType } from './type';
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
  context: Context
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
