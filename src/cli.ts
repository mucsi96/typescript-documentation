#!/usr/bin/env node
import program from 'commander';
import { mkdirSync, writeFileSync } from 'fs';
import { dirname, isAbsolute, resolve } from 'path';
import {
  CompilerOptions,
  getParsedCommandLineOfConfigFile,
  sys
} from 'typescript';
import { createDocumentation } from '.';
import { heading, joinSections } from './markdown';
import { formatDiagnosticError } from './utils';

type CLIOptions = {
  project: string;
  entry: string;
  output: string;
};

program
  .name('typescript-documentation')
  .description(
    'Generate markdown API documentation directly from TypeScript source code'
  )
  .option(
    '-p, --project <tsconfig file>',
    'relative or absolute path to a tsconfig.json file',
    './tsconfig.json'
  )
  .option(
    '-e, --entry <main file>',
    'entry/main file of project',
    './src/index.ts'
  )
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
      onUnRecoverableConfigFileDiagnostic: /* istanbul ignore next */ diagnostic => {
        /* istanbul ignore next */
        throw new Error(formatDiagnosticError(diagnostic));
      }
    }
  );

  /* istanbul ignore next */
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
const output = isAbsolute(cliOptions.output)
  ? cliOptions.output
  : resolve(process.cwd(), cliOptions.output);
const outputDir = dirname(output);
try {
  const documentation = createDocumentation(getOptions(cliOptions));
  try {
    mkdirSync(outputDir);
  } catch {
    1;
  }
  writeFileSync(output, documentation.get('default'), 'utf8');
  documentation.forEach((text: string, section: string) => {
    const fileName =
      section === 'default'
        ? output
        : resolve(outputDir, `${section.toLowerCase().replace(/ /g, '-')}.md`);

    const content =
      section === 'default' ? text : joinSections([heading(section, 1), text]);

    writeFileSync(fileName, content, 'utf8');
  });
} catch (e) {
  /* istanbul ignore next */
  console.log(e.message);
  /* istanbul ignore next */
  process.exit(1);
}
