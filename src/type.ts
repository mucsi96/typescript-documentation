import { renderTitle } from './title';
import { DeclarationReflection } from 'typedoc';
import { renderDescription } from './description';
import { renderExamples } from './examples';
import { renderAdditionalLinks } from './additionalLinks';
import { Type, ReflectionType } from 'typedoc/dist/lib/models';
import { renderSubSection } from './subSection';
import { renderTypeInfo } from './typeInfo';

function renderTypeDefinition(type?: Type): string[] {
  /* istanbul ignore else */
  if (type instanceof ReflectionType) {
    if (!type.declaration.children) {
      return [];
    }

    return [
      ...renderSubSection('Properties'),
      ...type.declaration.children.map(
        ({ name, flags, type }) =>
          `- \`${name}${flags && flags.isOptional ? '?' : ''}: ${renderTypeInfo(type)}\``
      )
    ];
  }

  /* istanbul ignore next */
  throw new Error(`Not supported type ${type && type.type}`);
}

export function renderType(reflection: DeclarationReflection): string[] {
  return [
    ...renderTitle(reflection.name),
    ...renderDescription(reflection),
    ...renderTypeDefinition(reflection.type),
    ...renderExamples(reflection),
    ...renderAdditionalLinks(reflection)
  ];
}
