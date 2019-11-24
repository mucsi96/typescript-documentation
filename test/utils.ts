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

export function testDocumentation(code: { [fileName: string]: string }, markdown: string): void {
  Object.entries(code).forEach(([fileName, source]) => {
    writeFileSync(resolve(testTempDir, fileName), source, 'utf8');
  });

  expect(createDocumentation(resolve(testTempDir, 'index.ts')).trim()).toEqual(markdown.trim());
}
