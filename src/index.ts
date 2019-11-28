import { Application, DeclarationReflection } from 'typedoc';
import { resolve, sep, isAbsolute } from 'path';
import { getDependentReflections } from './dependencies';
import { renderReflection } from './reflection';
import { TOptions } from './cli';

export function createDocumentation(options: TOptions): string {
  const { project: tsConfig = './tsconfig.json', entry = './src/index.ts' } = options;
  const tsConfigPath = isAbsolute(tsConfig) ? tsConfig : resolve(process.cwd(), tsConfig);
  const entryPath = isAbsolute(entry) ? entry : resolve(process.cwd(), entry);

  const app = new Application({ tsConfig: tsConfigPath });
  const { errors, project } = app.converter.convert([entryPath]);

  if (errors && errors.length) {
    errors.map(error => {
      throw new Error(error.messageText.toString());
    });
  }

  const entryReflection = Object.values(project.reflections).find(
    reflection => reflection.originalName.replace(/\//g, sep) === entryPath
  ) as DeclarationReflection;

  if (!entryReflection) {
    throw new Error('Entry module not found');
  }

  const reflections = getDependentReflections(entryReflection);

  return reflections
    .reduce<string[]>((acc, reflection) => [...acc, ...renderReflection(reflection)], [])
    .join('\n');
}
