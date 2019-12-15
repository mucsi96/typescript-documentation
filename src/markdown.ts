export function code(content: string): string {
  return `\`\`\`typescript\n${content}\n\`\`\``;
}

export function inlineCode(content: string): string {
  return `<code>${content}</code>`;
}

export function bolt(name: string): string {
  return `**${name.toUpperCase()}**`;
}

export function heading(name: string): string {
  return `## ${name}`;
}

export function listItem(text: string): string {
  return `- ${text}`;
}

export function link(text: string, link: string): string {
  return `[${text}](${link})`;
}

export function reference(text: string): string {
  return link(text, `#${text.toLowerCase().replace(/[^a-z\d]+/g, '')}`);
}
