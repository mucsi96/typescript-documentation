import { Application, DeclarationReflection } from 'typedoc';
import { resolve, sep } from 'path';
import { getDependentReflections } from './dependencies';
import { renderReflection } from './reflection';
import { TOptions } from './cli';

export function createDocumentation(options: TOptions): string {
  const app = new Application({
    tsConfig: resolve(process.cwd(), options.project)
  });
  const { errors, project } = app.converter.convert([options.entry]);

  if (errors && errors.length) {
    errors.map(error => {
      throw new Error(error.messageText.toString());
    });
  }

  const entryReflection = Object.values(project.reflections).find(
    reflection => reflection.originalName.replace(/\//g, sep) === options.entry
  ) as DeclarationReflection;

  if (!entryReflection) {
    throw new Error('Entry module not found');
  }

  const reflections = getDependentReflections(entryReflection);

  return reflections
    .reduce<string[]>((acc, reflection) => [...acc, ...renderReflection(reflection)], [])
    .join('\n');
}
