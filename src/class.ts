import { DeclarationReflection } from 'typedoc';
import { renderTitle } from './title';
import { renderDescription } from './description';
import { renderExamples } from './examples';
import { renderAdditionalLinks } from './additionalLinks';
import { renderFunctionSignature } from './function';

function getMethods(reflection: DeclarationReflection): DeclarationReflection[] {
  /* istanbul ignore if */
  if (!reflection.children) {
    return [];
  }

  const items = reflection.children.filter(
    item => item.kindString === 'Method' && item.flags.isPublic
  );

  items.sort((a, b) => {
    /* istanbul ignore if */
    if (!a.sources || !b.sources) {
      return 0;
    }

    return a.sources[0].line - b.sources[0].line;
  });

  return items;
}

export function renderClass(reflection: DeclarationReflection): string[] {
  const classInstanceName = `${reflection.name.charAt(0).toLowerCase() + reflection.name.slice(1)}`;
  const methods = getMethods(reflection);

  return [
    ...renderTitle(reflection.name),
    ...renderDescription(reflection),
    ...renderExamples(reflection),
    ...renderAdditionalLinks(reflection),
    '',
    ...methods.reduce<string[]>((output, method) => {
      /* istanbul ignore if */
      if (!method.signatures) {
        return output;
      }

      return [
        ...output,
        ...method.signatures.reduce<string[]>(
          (output, signature) => [
            ...output,
            ...renderFunctionSignature(`${classInstanceName}.${signature.name}`, signature)
          ],
          []
        )
      ];
    }, [])
  ];
}
