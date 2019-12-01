import { DeclarationReflection } from 'typedoc';
import { renderTitle } from './title';
import { render } from './type';
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
        `- \`${name}${flags && flags.isOptional ? '?' : ''}: ${render(type)}\``
    )
  ];
}

export function renderFunctionSignature(name: string, signature: SignatureReflection): string[] {
  const { parameters = [], type } = signature;
  const title = `${name}(${parameters.map(({ name }) => name).join(', ')})`;

  return [
    ...renderTitle(title),
    ...renderDescription(signature),
    ...renderFunctionParameters(parameters),
    ...renderSubSection('Returns'),
    `\`${render(type)}\``,
    ...renderExamples(signature),
    ...renderAdditionalLinks(signature),
    ''
  ];
}

export function renderFunction(reflection: DeclarationReflection): string[] {
  /* istanbul ignore if */
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
