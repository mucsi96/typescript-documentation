import { rewiremock } from './utils';
import { TOptions } from '../src/cli';
import expect from 'expect';

type TCLIResult = {
  options: TOptions;
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
      createDocumentation: (options: TOptions): string => {
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

describe.only('CLI', () => {
  it('writes markdown to provided output file (long)', () => {
    process.argv = ['node', 'typescript-documentation', '--output', 'test.md'];
    expect(runCLI().outputFile).toEqual('test.md');
    expect(runCLI().outputContent).toEqual('test docs');
    expect(runCLI().options).toEqual({ output: 'test.md' });
  });

  it('writes markdown to provided output file (short)', () => {
    process.argv = ['node', 'typescript-documentation', '-o', 'test.md'];
    expect(runCLI().outputFile).toEqual('test.md');
    expect(runCLI().outputContent).toEqual('test docs');
    expect(runCLI().options).toEqual({ output: 'test.md' });
  });

  it('reads tsConfig path from command line options (long)', () => {
    process.argv = [
      'node',
      'typescript-documentation',
      '-o',
      'test.md',
      '--project',
      './tsconfig.json'
    ];
    expect(runCLI().options.project).toEqual('./tsconfig.json');
  });

  it('reads tsConfig path from command line options (short)', () => {
    process.argv = ['node', 'typescript-documentation', '-o', 'test.md', '-p', './tsconfig.json'];
    expect(runCLI().options.project).toEqual('./tsconfig.json');
  });

  it('reads entry file path from command line options (long)', () => {
    process.argv = [
      'node',
      'typescript-documentation',
      '-o',
      'test.md',
      '--entry',
      './src/index.ts'
    ];
    expect(runCLI().options.entry).toEqual('./src/index.ts');
  });

  it('reads entry file path from command line options (short)', () => {
    process.argv = ['node', 'typescript-documentation', '-o', 'test.md', '-e', './src/index.ts'];
    expect(runCLI().options.entry).toEqual('./src/index.ts');
  });

  it('reads section filter from command line options (long)', () => {
    process.argv = ['node', 'typescript-documentation', '-o', 'test.md', '--section', 'intro'];
    expect(runCLI().options.section).toEqual('intro');
  });

  it('reads section filter from command line options (short)', () => {
    process.argv = ['node', 'typescript-documentation', '-o', 'test.md', '-s', 'intro'];
    expect(runCLI().options.section).toEqual('intro');
  });
});
