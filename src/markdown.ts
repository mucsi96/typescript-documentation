function wrap(content: string, prefix: string, sufix = prefix): string {
  return content && [prefix, content, sufix].join('');
}

export function joinLines(lines: string[]): string {
  return lines.filter(Boolean).join('\n');
}

export function joinSections(sections: string[]): string {
  return sections.filter(Boolean).join('\n\n');
}

export function code(content: string): string {
  return content && joinLines(['```typescript', content, '```']);
}

export function inlineCode(content: string): string {
  return wrap(content, '<code>', '</code>');
}

export function subSection(name: string): string {
  return wrap(name.toUpperCase(), '**');
}

export function heading(name: string): string {
  return ['##', name].join(' ');
}

export function listItem(text: string, level = 1): string {
  return ['  '.repeat(level - 1), '- ', text].join('');
}

export function link(text: string, link: string): string {
  return `[${text}](${link})`;
}

export function reference(text: string): string {
  return link(text, `#${text.toLowerCase().replace(/[^a-z\d]+/g, '')}`);
}