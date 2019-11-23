import { Application } from 'typedoc';
import { resolve, sep } from 'path';

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

  const entryModule = Object.values(project.reflections).find(
    reflection => reflection.originalName.replace(/\//g, sep) === entry
  );

  if (!entryModule) {
    throw new Error('Entry module not found');
  }

  console.log(entryModule);

  return entry;
}
