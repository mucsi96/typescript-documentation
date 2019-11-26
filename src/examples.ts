import { CommentTag, Reflection } from 'typedoc/dist/lib/models';
import { renderSubSection } from './subSection';

function getExamples(reflection: Reflection): CommentTag[] {
  if (!reflection.comment || !reflection.comment.tags) {
    return [];
  }

  return reflection.comment.tags.filter(tag => tag.tagName === 'example');
}

export function renderExamples(reflection: Reflection): string[] {
  const examples = getExamples(reflection);

  if (!examples.length) {
    return [];
  }

  return [
    ...renderSubSection('Examples'),
    ...examples.map(example => `\`\`\`\n${example.text.trim()}\n\`\`\``)
  ];
}
