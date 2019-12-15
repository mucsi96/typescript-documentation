import { JSDocTagInfo } from 'typescript';
import { subSection, code, joinSections } from './markdown';

export function renderExamples(tags: JSDocTagInfo[]): string {
  const examples = tags.filter(tag => tag.name === 'example');

  if (!examples.length) {
    return '';
  }

  return joinSections([
    subSection('Examples'),
    joinSections(
      examples.map(example =>
        code(example.text ? example.text.trim() : /* istanbul ignore next */ '')
      )
    )
  ]);
}
