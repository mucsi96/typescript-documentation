import {
  TypeFlags,
  SymbolFlags,
  SourceFile,
  ScriptTarget,
  CompilerHost,
  createSourceFile,
  Diagnostic,
  formatDiagnostic,
  Declaration
} from 'typescript';
import { inspect } from 'util';

export function createCompilerHost(sourceCode: { [name: string]: string }): CompilerHost {
  return {
    getSourceFile: (name: string): SourceFile =>
      createSourceFile(name, (sourceCode && sourceCode[name]) || '', ScriptTarget.Latest),
    writeFile: (): void => {},
    getDefaultLibFileName: (): string => 'lib.d.ts',
    useCaseSensitiveFileNames: (): boolean => false,
    getCanonicalFileName: (filename: string): string => filename,
    getCurrentDirectory: (): string => '',
    getNewLine: (): string => '\n',
    getDirectories: (): string[] => [],
    fileExists: (): boolean => true,
    readFile: (): string => ''
  };
}

function isNumeric(value: [string, string | number]): value is [string, number] {
  return typeof value[1] === 'number';
}

export function findExactMatchingTypeFlag(flags: TypeFlags): string {
  const match = Object.keys(TypeFlags)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .map<[string, string | number]>(key => [key, TypeFlags[key as any]])
    .filter(isNumeric)
    .find(([, value]) => Math.log2(value) % 1 === 0 && value & flags);

  if (!match) {
    throw new Error(`No exact matching flag for ${flags}`);
  }

  return match[0];
}

export function findExactMatchingSymbolFlags(flags: SymbolFlags): string {
  const match = Object.keys(SymbolFlags)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .map<[string, string | number]>(key => [key, SymbolFlags[key as any]])
    .filter(isNumeric)
    .find(([, value]) => Math.log2(value) % 1 === 0 && value & flags);

  if (!match) {
    throw new Error(`No exact matching flag for ${flags}`);
  }

  return match[0];
}

export function formatDiagnosticError(diagnostic: Diagnostic): string {
  return formatDiagnostic(diagnostic, {
    getCurrentDirectory: (): string => process.cwd(),
    getCanonicalFileName: (fileName: string): string => fileName,
    getNewLine: (): string => '\n'
  });
}

export function getDeclarationSourceLocation(declaration: Declaration): string {
  const sourceFile = declaration.getSourceFile();
  const pos = sourceFile.getLineAndCharacterOfPosition(declaration.getStart());
  const fileNameWithPosition = [sourceFile.fileName, pos.line, pos.character].join(':');
  const line = sourceFile.getFullText().split('\n')[pos.line];
  const indentationMatch = /^([ \t]*)(?=\S)/.exec(line);
  const indentation = indentationMatch ? indentationMatch[1].length : 0;
  const lineWithoutIndentation = indentationMatch ? line.substr(indentation) : line;
  const posMarker = '^'.padStart(pos.character + 1 - indentation);
  return [`at ${fileNameWithPosition}`, lineWithoutIndentation, posMarker].join('\n');
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function inspectObject(type: any): string {
  const obj = Object.keys(type)
    .filter(key => ['checker'].includes(key))
    .reduce((newObj, key) => Object.assign(newObj, { [key]: type[key] }), {});

  return inspect(obj, false, 1, true);
}
