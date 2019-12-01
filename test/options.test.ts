import expect from 'expect';
import { populateDefaultOptions } from '../src/options';
import { resolve } from 'path';

describe('options', () => {
  describe('optionsWithDefaults', () => {
    it('provides defaults', () => {
      const optionsWithDefaults = populateDefaultOptions({});
      expect(optionsWithDefaults).toEqual({
        compilerOptions: {},
        entry: resolve(process.cwd(), 'src/index.ts'),
        output: resolve(process.cwd(), 'output.md')
      });
    });

    it('passes through the compilerOptions', () => {
      const { compilerOptions } = populateDefaultOptions({ compilerOptions: { strict: true } });
      expect(compilerOptions).toEqual({ strict: true });
    });

    it('passes through the sourceCode', () => {
      const { sourceCode } = populateDefaultOptions({ sourceCode: { index: 'const a = 1;' } });
      expect(sourceCode).toEqual({ index: 'const a = 1;' });
    });

    it('handles relative entry path', () => {
      const { entry } = populateDefaultOptions({ entry: './src/testEntry.ts' });
      expect(entry).toEqual(resolve(process.cwd(), 'src/testEntry.ts'));
    });

    it('handles absolute entry path', () => {
      const testPath = resolve(process.cwd(), 'src/testEntry.ts');
      const { entry } = populateDefaultOptions({ entry: testPath });
      expect(entry).toEqual(testPath);
    });

    it('handles relative output path', () => {
      const { output } = populateDefaultOptions({ output: './testOutput.md' });
      expect(output).toEqual(resolve(process.cwd(), 'testOutput.md'));
    });

    it('handles absolute output path', () => {
      const testPath = resolve(process.cwd(), 'testOutput.md');
      const { output } = populateDefaultOptions({ output: testPath });
      expect(output).toEqual(testPath);
    });
  });
});
