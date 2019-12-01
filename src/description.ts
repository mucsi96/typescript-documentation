import { SymbolDisplayPart } from 'typescript';

export function renderDescription(comments: SymbolDisplayPart[]): string[] {
  return comments.map(comment => comment.text);
}
