import program from 'commander';
import { createDocumentation } from '.';
import { writeFileSync } from 'fs';

export type TOptions = {
  project?: string;
  entry?: string;
  output?: string;
  section?: string;
};

program
  .name('typescript-documentation')
  .description('Generate markdown API documentation directly from TypeScript source code')
  .option(
    '-p, --project <tsconfig file>',
    'relative or absolute path to a tsconfig.json file (default: ./tsconfig.json)'
  )
  .option('-e, --entry <main file>', 'entry/main file of project (default: ./src/index.ts)')
  .option(
    '-o, --output <markdown file>',
    'markdown documentation output file location (default: ./output.md)'
  )
  .option('-s, --section <tag>', 'document only parts of API which has provided section tag');

program.parse(process.argv);

const options = Object.fromEntries(
  Object.entries(program.opts()).filter(([, value]) => value)
) as TOptions;

if (options.output) {
  writeFileSync(options.output, createDocumentation(options), 'utf8');
}
