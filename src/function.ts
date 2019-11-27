import { DeclarationReflection } from 'typedoc';
import { renderHeading } from './heading';
import { renderType } from './type';
import { renderDescription } from './description';
import { renderExamples } from './examples';
import { renderAdditionalLinks } from './additionalLinks';
import { renderSubSection } from './subSection';

export function renderFunction(reflection: DeclarationReflection): string[] {
  if (!reflection.signatures) {
    return [];
  }

  return reflection.signatures.reduce<string[]>((output, signature): string[] => {
    const { name, parameters = [], type } = signature;
    const title = `${name}(${parameters.map(({ name }) => name).join(', ')})`;

    return [
      ...output,
      ...renderHeading(title, name),
      ...renderDescription(signature),
      ...renderSubSection('Parameters'),
      ...parameters.map(
        ({ name, flags, type }) =>
          `- \`${name}${flags && flags.isOptional ? '?' : ''}: ${renderType(type)}\``
      ),
      ...renderSubSection('Returns'),
      `\`${renderType(type)}\``,
      ...renderExamples(signature),
      ...renderAdditionalLinks(signature)
    ];
  }, []);
}
