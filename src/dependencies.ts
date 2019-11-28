import { DeclarationReflection, ReflectionKind } from 'typedoc';

export function getDependentReflections(
  reflection: DeclarationReflection
): DeclarationReflection[] {
  if (!reflection.children) {
    return [];
  }

  switch (reflection.kind) {
    case ReflectionKind.ExternalModule: {
      const moduleItems = reflection.children.filter(item => item.flags.isExported);

      moduleItems.sort((a, b) => {
        /* istanbul ignore if */
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
