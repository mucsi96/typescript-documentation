import program from 'commander';
import { createDocumentation } from '.';
import { writeFileSync } from 'fs';
import {
  CompilerOptions,
  getParsedCommandLineOfConfigFile,
  sys,
  formatDiagnostic
} from 'typescript';
import { isAbsolute, resolve } from 'path';

type CLIOptions = {
  project: string;
  entry: string;
  output: string;
};

program
  .name('typescript-documentation')
  .description('Generate markdown API documentation directly from TypeScript source code')
  .option(
    '-p, --project <tsconfig file>',
    'relative or absolute path to a tsconfig.json file',
    './tsconfig.json'
  )
  .option('-e, --entry <main file>', 'entry/main file of project', './src/index.ts')
  .option(
    '-o, --output <markdown file>',
    'markdown documentation output file location',
    './output.md'
  );

function getCompilerOptions(cliOptions: CLIOptions): CompilerOptions {
  const tsConfigPath = isAbsolute(cliOptions.project)
    ? cliOptions.project
    : resolve(process.cwd(), cliOptions.project);

  const config = getParsedCommandLineOfConfigFile(
    tsConfigPath,
    {},
    {
      ...sys,
      onUnRecoverableConfigFileDiagnostic: diagnostic =>
        formatDiagnostic(diagnostic, {
          getCurrentDirectory: (): string => process.cwd(),
          getCanonicalFileName: (fileName: string): string => fileName,
          getNewLine: (): string => '\n'
        })
    }
  );

  if (!config) {
    throw new Error(`Unable to parse ${tsConfigPath}`);
  }
  return config.options;
}

type Options = {
  compilerOptions: CompilerOptions;
  entry: string;
  sourceCode?: { [name: string]: string };
};

function getOptions(cliOptions: CLIOptions): Options {
  return {
    compilerOptions: getCompilerOptions(cliOptions),
    entry: isAbsolute(cliOptions.entry)
      ? cliOptions.entry
      : resolve(process.cwd(), cliOptions.entry)
  };
}

program.parse(process.argv);
const cliOptions = program.opts() as CLIOptions;
const markdown = createDocumentation(getOptions(cliOptions));
writeFileSync(cliOptions.output, markdown, 'utf8');
