import { Application, DeclarationReflection } from 'typedoc';
import { resolve, sep } from 'path';
import slugify from '@sindresorhus/slugify';

function getDependentReflections(reflection: DeclarationReflection): DeclarationReflection[] {
  if (!reflection.children) {
    return [];
  }

  switch (reflection.kindString) {
    case 'External module': {
      const moduleItems = reflection.children.filter(item => item.flags.isExported);

      moduleItems.sort((a, b) => {
        if (!a.sources || !b.sources) {
          return 0;
        }

        return a.sources[0].line - b.sources[0].line;
      });

      return moduleItems.reduce(
        (dependencies, child) => [...dependencies, ...getDependentReflections(child)],
        moduleItems
      );
    }
    default:
      return [];
  }
}

function renderHeading(title: string, level = 1): string {
  return `${Array(level).fill('#')} [${title}](#${slugify(title)})`;
}

function renderVariable(reflection: DeclarationReflection): string[] {
  const result = [renderHeading(reflection.name)];

  if (reflection.comment) {
    result.push(reflection.comment.shortText);
  }

  result.push(`##### Type`);

  return result;
}

function renderReflection(reflection: DeclarationReflection): string[] {
  switch (reflection.kindString) {
    case 'Variable':
      return renderVariable(reflection);
    default:
      return [];
  }
}

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
