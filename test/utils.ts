import { writeFileSync, mkdirSync } from 'fs';
import { resolve } from 'path';
import expect from 'expect';
import { createDocumentation } from '../src';
import rimraf from 'rimraf';

const testTempDir = resolve(__dirname, '../.test-temp');

export function prepare(): void {
  mkdirSync(testTempDir);
}

export function cleanup(): void {
  rimraf.sync(testTempDir);
}

export function testDocumentation(code: { [fileName: string]: string }): void {
  Object.entries(code)
    .filter(([fileName]) => fileName !== 'result')
    .forEach(([fileName, source]) => {
      writeFileSync(resolve(testTempDir, fileName), source, 'utf8');
    });

  const output = code.markdown.split('\n');
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

  expect(createDocumentation(resolve(testTempDir, 'index.ts')).trim()).toEqual(trimmedOutput);
}
