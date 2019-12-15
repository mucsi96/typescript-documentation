import expect from 'expect';
import { createDocumentation } from '../src';
import rewiremock from 'rewiremock';

rewiremock.overrideEntryPoint(module);

export function testDocumentation({
  markdown,
  ...sourceCode
}: {
  [fileName: string]: string;
}): void {
  const output = markdown.split('\n');
  const padding = output.length
    ? output.reduce((min, line) => {
        const match = /^(\s*)(\S)/.exec(line);
        if (!match || match[1].length > min) {
          return min;
        }

        return match[1].length;
      }, 9999)
    : 0;
  const trimmedOutput = output
    .map(line => (line.length > padding ? line.substr(padding) : line))
    .join('\n')
    .trim();

  expect(
    createDocumentation({
      entry: 'index.ts',
      sourceCode: {
        ...sourceCode,
        'lib.d.ts': `
          interface Array<T> {}
          interface Promise<T> {}
        `
      },
      compilerOptions: {
        strict: true,
        esModuleInterop: true
      }
    }).trim()
  ).toEqual(trimmedOutput);
}

export { rewiremock };
