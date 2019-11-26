import { DeclarationReflection } from 'typedoc';
import { CommentTag } from 'typedoc/dist/lib/models';

function getExamples(reflection: DeclarationReflection): CommentTag[] {
  if (!reflection.comment || !reflection.comment.tags) {
    return [];
  }

  return reflection.comment.tags.filter(tag => tag.tagName === 'example');
}

export function renderExamples(reflection: DeclarationReflection): string[] {
  const examples = getExamples(reflection);
  if (!examples.length) {
    return [];
  }

  return ['##### Examples', ...examples.map(example => `\`\`\`\n${example.text.trim()}\n\`\`\``)];
}
