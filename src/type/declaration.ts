import { Type, TypeReference } from 'typescript';
import { Context } from '../context';
import {
  isArrayType,
  getArrayType,
  isReference,
  isOptionalType
} from './utils';
import { renderType } from '.';
import { getTypeTitle } from './title';
import { reference, inlineCode } from '../markdown';
import { TypeContext } from './context';

export function renderTypeDeclaration(
  type: Type,
  context: Context,
  typeContext: TypeContext = {}
): string {
  const typeReference = type as TypeReference;
  const arrayType = isArrayType(type) && getArrayType(type);

  if (arrayType) {
    return renderType(arrayType, context, {
      isArray: true,
      noWrap: typeContext.noWrap,
      name: typeContext.name
    });
  }

  const title = getTypeTitle(type, context);
  const typeArguments = (typeReference.typeArguments || [])
    .map(typeArgument => renderType(typeArgument, context, { noWrap: true }))
    .join(', ');

  const result = [
    typeContext.name &&
      `${typeContext.name}${isOptionalType(type) ? '?' : ''}: `,
    isReference(type, context) ? reference(title) : title,
    ...(typeArguments ? [`\\<${typeArguments}\\>`] : []),
    ...(typeContext.isArray ? ['[]'] : [])
  ].join('');

  return !result || typeContext.noWrap ? result : inlineCode(result);
}
