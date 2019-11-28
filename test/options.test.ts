import expect from 'expect';
import { createConfigurationFromOptions } from '../src/options';
import { resolve } from 'path';

describe('options', () => {
  it('provides default configuration', () => {
    const configuration = createConfigurationFromOptions({});
    expect(configuration).toEqual({
      tsConfig: resolve(process.cwd(), 'tsconfig.json'),
      entry: resolve(process.cwd(), 'src/index.ts')
    });
  });

  it('handles relative tsConfig path', () => {
    const configuration = createConfigurationFromOptions({ project: './config/testTsConfig.json' });
    expect(configuration.tsConfig).toEqual(resolve(process.cwd(), 'config/testTsConfig.json'));
  });

  it('handles absolute tsConfig path', () => {
    const testPath = resolve(process.cwd(), 'config/testTsConfig.json');
    const configuration = createConfigurationFromOptions({ project: testPath });
    expect(configuration.tsConfig).toEqual(testPath);
  });

  it('handles relative entry path', () => {
    const configuration = createConfigurationFromOptions({ entry: './src/testEntry.ts' });
    expect(configuration.entry).toEqual(resolve(process.cwd(), 'src/testEntry.ts'));
  });

  it('handles absolute entry path', () => {
    const testPath = resolve(process.cwd(), 'src/testEntry.ts');
    const configuration = createConfigurationFromOptions({ entry: testPath });
    expect(configuration.entry).toEqual(testPath);
  });
});
