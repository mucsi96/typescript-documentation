import { SourceFile, createSourceFile, ScriptTarget, CompilerHost } from 'typescript';

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
