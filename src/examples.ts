import { JSDocTagInfo } from 'typescript';
import { bolt, code } from './markdown';

export function renderExamples(tags: JSDocTagInfo[]): string[] {
  const examples = tags.filter(tag => tag.name === 'example');

  if (!examples.length) {
    return [];
  }

  return [
    bolt('Examples'),
    ...examples.map(example => code(example.text ? example.text.trim() : ''))
  ];
}
