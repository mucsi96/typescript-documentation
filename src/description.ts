import { Symbol, TypeChecker } from 'typescript';

export function renderDescription(symbol: Symbol, typeChecker: TypeChecker): string[] {
  const documentationComment = symbol.getDocumentationComment(typeChecker);

  return documentationComment.map(comment => comment.text);
}
