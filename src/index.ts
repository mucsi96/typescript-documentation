import { Application, DeclarationReflection } from 'typedoc';
import { resolve, sep } from 'path';
import { getDependentReflections } from './dependencies';
import { renderReflection } from './reflection';

export function createDocumentation(entry: string): string {
  const app = new Application({
    tsConfig: resolve(__dirname, '../tsconfig.json')
  });
  const { errors, project } = app.converter.convert([entry]);

  if (errors && errors.length) {
    errors.map(error => {
      throw new Error(error.messageText.toString());
    });
  }

  const entryReflection = Object.values(project.reflections).find(
    reflection => reflection.originalName.replace(/\//g, sep) === entry
  ) as DeclarationReflection;

  if (!entryReflection) {
    throw new Error('Entry module not found');
  }

  const reflections = getDependentReflections(entryReflection);

  console.log(reflections);

  return reflections
    .reduce<string[]>((acc, reflection) => [...acc, ...renderReflection(reflection)], [])
    .join('\n');
}
