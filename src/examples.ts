import { renderSubSection } from './subSection';
import { Symbol } from 'typescript';

export function renderExamples(symbol: Symbol): string[] {
  const examples = symbol.getJsDocTags().filter(tag => tag.name === 'example');

  if (!examples.length) {
    return [];
  }

  return [
    ...renderSubSection('Examples'),
    ...examples.map(example => `\`\`\`typescript\n${example.text && example.text.trim()}\n\`\`\``)
  ];
}
