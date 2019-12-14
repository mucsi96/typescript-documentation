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
  const padding = output.reduce((max, line) => {
    const match = /^\s*/.exec(line);
    if (!match || match[0].length < max) {
      return max;
    }

    return match[0].length;
  }, 0);
  const trimmedOutput = output
    .map(line => line.substr(padding))
    .join('\n')
    .trim();

  expect(
    createDocumentation({
      entry: 'index.ts',
      sourceCode: {
        ...sourceCode,
        'lib.d.ts': 'interface Array<T> {}'
      },
      compilerOptions: {
        strict: true,
        esModuleInterop: true
      }
    }).trim()
  ).toEqual(trimmedOutput);
}

export { rewiremock };
