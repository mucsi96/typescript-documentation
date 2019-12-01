import { isAbsolute, resolve } from 'path';
import { CompilerOptions } from 'typescript';

export type TOptions = {
  compilerOptions?: CompilerOptions;
  entry?: string;
  output?: string;
  sourceCode?: { [name: string]: string };
};

export type TOptionsWithDefaults = {
  compilerOptions: CompilerOptions;
  entry: string;
  output: string;
  sourceCode?: { [name: string]: string };
};

export function populateDefaultOptions(options: TOptions): TOptionsWithDefaults {
  const {
    compilerOptions = {},
    entry = './src/index.ts',
    output = './output.md',
    sourceCode
  } = options;

  return {
    compilerOptions,
    entry: sourceCode || isAbsolute(entry) ? entry : resolve(process.cwd(), entry),
    output: sourceCode || isAbsolute(output) ? output : resolve(process.cwd(), output),
    sourceCode
  };
}
