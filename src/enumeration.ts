import { DeclarationReflection } from 'typedoc';
import { renderTitle } from './title';
import { renderDescription } from './description';
import { renderExamples } from './examples';
import { renderAdditionalLinks } from './additionalLinks';
import { renderSubSection } from './subSection';

function renderEnumerationItems(reflection: DeclarationReflection): string[] {
  if (!reflection.children) {
    return [];
  }

  return [
    ...renderSubSection('Possible values'),
    ...reflection.children.map(value => `- \`${value.name}\``)
  ];
}

export function renderEnumeration(reflection: DeclarationReflection): string[] {
  return [
    ...renderTitle(reflection.name),
    ...renderDescription(reflection),
    ...renderEnumerationItems(reflection),
    ...renderExamples(reflection),
    ...renderAdditionalLinks(reflection),
    ''
  ];
}
