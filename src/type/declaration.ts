import { Type, TypeReference } from 'typescript';
import { renderType } from '.';
import { Context } from '../context';
import { inlineCode, link } from '../markdown';
import { getSymbolSection } from '../utils';
import { TypeContext } from './context';
import { getTypeTitle } from './title';
import {
  getArrayType,
  getExportedSymbolByType,
  isArrayType,
  isOptionalType
} from './utils';

function getReferenceUrl(type: Type, context: Context): string | undefined {
  const exportedSymbol = getExportedSymbolByType(type, context);

  if (!exportedSymbol) {
    return;
  }

  const section = getSymbolSection(exportedSymbol);
  const location =
    section !== context.section ? context.getSectionLocation(section) : '';
  const hash = exportedSymbol
    .getName()
    .toLowerCase()
    .replace(/[^a-z\d]+/g, '');

  return [location, hash].join('#');
}

export function renderTypeDeclaration(
  type: Type,
  context: Context,
  typeContext: TypeContext
): string {
  const typeReference = type as TypeReference;
  const arrayType = isArrayType(type) && getArrayType(type);

  if (arrayType) {
    return renderType(arrayType, context, {
      isArray: true,
      name: typeContext.name
    });
  }

  const title = getTypeTitle(type, context);
  const typeArguments = (typeReference.typeArguments || [])
    .map(typeArgument => renderType(typeArgument, context, { noWrap: true }))
    .join(', ');
  const url = getReferenceUrl(type, context);

  const typeDeclaration = [
    url ? link(title, url) : title,
    ...(typeArguments ? [`<${typeArguments}>`] : []),
    ...(typeContext.isArray ? ['[]'] : [])
  ].join('');
  const noWrap =
    !typeDeclaration ||
    typeContext.noWrap ||
    /\[.*\]\(.*\)/.test(typeDeclaration) ||
    / | /.test(typeDeclaration);

  return [
    typeContext.name &&
      `${inlineCode(typeContext.name)}${isOptionalType(type) ? '?' : ''}: `,
    !typeDeclaration || noWrap ? typeDeclaration : inlineCode(typeDeclaration)
  ].join('');
}
