import { renderSubSection } from './subSection';
import { JSDocTagInfo } from 'typescript';

export function renderExamples(tags: JSDocTagInfo[]): string[] {
  const examples = tags.filter(tag => tag.name === 'example');

  if (!examples.length) {
    return [];
  }

  return [
    ...renderSubSection('Examples'),
    ...examples.map(example => `\`\`\`typescript\n${example.text && example.text.trim()}\n\`\`\``)
  ];
}
