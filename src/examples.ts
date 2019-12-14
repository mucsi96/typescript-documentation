import { JSDocTagInfo } from 'typescript';
import { subSection, code } from './markdown';

export function renderExamples(tags: JSDocTagInfo[]): string[] {
  const examples = tags.filter(tag => tag.name === 'example');

  if (!examples.length) {
    return [];
  }

  return [
    subSection('Examples'),
    ...examples.map(example => code(example.text ? example.text.trim() : ''))
  ];
}
