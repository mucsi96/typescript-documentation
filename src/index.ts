import { Application, DeclarationReflection } from 'typedoc';
import { sep } from 'path';
import { getDependentReflections } from './dependencies';
import { renderReflection } from './reflection';
import { createConfigurationFromOptions, TOptions } from './options';

export function createDocumentation(options: TOptions): string {
  const { tsConfig, entry } = createConfigurationFromOptions(options);

  const app = new Application({ tsConfig });
  const { errors, project } = app.converter.convert([entry]);

  if (errors && errors.length) {
    errors.map(error => {
      throw new Error(error.messageText.toString());
    });
  }

  const entryReflection = Object.values(project.reflections).find(
    reflection => reflection.originalName.replace(/\//g, sep) === entry
  ) as DeclarationReflection;

  /* istanbul ignore if */
  if (!entryReflection) {
    throw new Error('Entry module not found');
  }

  const reflections = getDependentReflections(entryReflection);

  return reflections
    .reduce<string[]>((acc, reflection) => [...acc, ...renderReflection(reflection)], [])
    .join('\n');
}
