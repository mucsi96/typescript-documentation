import { rewiremock } from './utils';
import expect from 'expect';
import { Options } from '../src';

type TCLIResult = {
  options: Options;
  outputFile: string | undefined;
  outputContent: string | undefined;
};

function runCLI(): TCLIResult {
  const result: TCLIResult = {
    options: {},
    outputFile: undefined,
    outputContent: undefined
  };

  rewiremock.proxy('../src/cli', {
    '.': {
      createDocumentation: (options: Options): string => {
        result.options = options;
        return 'test docs';
      }
    },
    fs: {
      writeFileSync: (file: string, content: string): void => {
        result.outputFile = file;
        result.outputContent = content;
      }
    }
  });

  return result;
}

describe('CLI', () => {
  it('provides empty options by default', () => {
    process.argv = ['node', 'typescript-documentation'];
    expect(runCLI().options).toEqual({});
  });

  it('writes markdown to provided output file (long)', () => {
    process.argv = ['node', 'typescript-documentation', '--output', 'test.md'];
    expect(runCLI().outputFile).toEqual('test.md');
  });

  it('writes markdown to provided output file (short)', () => {
    process.argv = ['node', 'typescript-documentation', '-o', 'test.md'];
    expect(runCLI().outputFile).toEqual('test.md');
  });

  it('reads tsConfig path from command line options (long)', () => {
    process.argv = ['node', 'typescript-documentation', '--project', './tsconfig.json'];
    expect(runCLI().options.compilerOptions).toEqual('./tsconfig.json');
  });

  it('reads tsConfig path from command line options (short)', () => {
    process.argv = ['node', 'typescript-documentation', '-p', './tsconfig.json'];
    expect(runCLI().options.compilerOptions).toEqual('./tsconfig.json');
  });

  it('reads entry file path from command line options (long)', () => {
    process.argv = ['node', 'typescript-documentation', '--entry', './src/index.ts'];
    expect(runCLI().options.entry).toEqual('./src/index.ts');
  });

  it('reads entry file path from command line options (short)', () => {
    process.argv = ['node', 'typescript-documentation', '-e', './src/index.ts'];
    expect(runCLI().options.entry).toEqual('./src/index.ts');
  });

  it('reads output file from command line options (long)', () => {
    process.argv = ['node', 'typescript-documentation', '-o', 'test.md'];
    expect(runCLI().options.output).toEqual('test.md');
  });

  it('reads output file from command line options (short)', () => {
    process.argv = ['node', 'typescript-documentation', '-o', 'test.md'];
    expect(runCLI().options.output).toEqual('test.md');
  });
});
