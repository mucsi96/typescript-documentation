import { DeclarationReflection } from 'typedoc';
import { renderTitle } from './title';
import { renderTypeInfo } from './typeInfo';
import { renderDescription } from './description';
import { renderExamples } from './examples';
import { renderAdditionalLinks } from './additionalLinks';
import { renderSubSection } from './subSection';
import { SignatureReflection, ParameterReflection } from 'typedoc/dist/lib/models';

export function renderFunctionParameters(parameters: ParameterReflection[]): string[] {
  if (!parameters.length) {
    return [];
  }

  return [
    ...renderSubSection('Parameters'),
    ...parameters.map(
      ({ name, flags, type }) =>
        `- \`${name}${flags && flags.isOptional ? '?' : ''}: ${renderTypeInfo(type)}\``
    )
  ];
}

export function renderFunctionSignature(name: string, signature: SignatureReflection): string[] {
  const { parameters = [], type } = signature;
  const title = `${name}(${parameters.map(({ name }) => name).join(', ')})`;

  return [
    ...renderTitle(title, name),
    ...renderDescription(signature),
    ...renderFunctionParameters(parameters),
    ...renderSubSection('Returns'),
    `\`${renderTypeInfo(type)}\``,
    ...renderExamples(signature),
    ...renderAdditionalLinks(signature),
    ''
  ];
}

export function renderFunction(reflection: DeclarationReflection): string[] {
  if (!reflection.signatures) {
    return [];
  }

  return reflection.signatures.reduce<string[]>(
    (output, signature): string[] => [
      ...output,
      ...renderFunctionSignature(signature.name, signature)
    ],
    []
  );
}
