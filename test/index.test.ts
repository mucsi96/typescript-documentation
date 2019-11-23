import { readdirSync, readFileSync } from 'fs';
import { createDocumentation } from '../src';
import { join } from 'path';
import expect from 'expect';

readdirSync(__dirname, { withFileTypes: true })
  .filter(item => item.isDirectory())
  .forEach(folder => {
    it(folder.name, () => {
      const entry = join(__dirname, folder.name, 'index.ts');
      const expectedOutput = readFileSync(join(__dirname, folder.name, 'index.md'), 'utf8');
      expect(createDocumentation(entry)).toEqual(expectedOutput);
    });
  });
