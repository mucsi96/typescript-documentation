import { rewiremock } from './utils';
import expect from 'expect';
import { Options } from '../src';
import * as ts from 'typescript';
import { resolve } from 'path';

type CLIResult = {
  options: Options;
  outputFile: string | undefined;
  outputContent: string | undefined;
};

function runCLI(): CLIResult {
  const result: CLIResult = {
    options: {} as Options,
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
    },
    typescript: {
      ...ts,
      sys: {
        ...ts.sys,
        readFile: (file: string): string => {
          if (file === resolve(process.cwd(), 'test.tsconfig.json')) {
            return '{"compilerOptions": {"strict": true}}';
          }
          if (file === resolve(process.cwd(), 'tsconfig.json')) {
            return '{"compilerOptions": {"strict": false}}';
          }
          return '';
        },
        fileExists: (): boolean => true
      }
    }
  });

  return result;
}

describe('CLI', () => {
  it('reads compiler options from default config file location', () => {
    process.argv = ['node', 'typescript-documentation'];
    expect(runCLI().options.compilerOptions.strict).toBe(false);
  });

  it('reads compiler options from provided config file (long)', () => {
    process.argv = ['node', 'typescript-documentation', '--project', './test.tsconfig.json'];
    expect(runCLI().options.compilerOptions.strict).toBe(true);
  });

  it('reads compiler options from provided config file (short)', () => {
    process.argv = ['node', 'typescript-documentation', '-p', './test.tsconfig.json'];
    expect(runCLI().options.compilerOptions.strict).toBe(true);
  });

  it('reads compiler options from provided config file (absolute)', () => {
    const path = resolve(process.cwd(), 'test.tsconfig.json');
    process.argv = ['node', 'typescript-documentation', '--project', path];
    expect(runCLI().options.compilerOptions.strict).toBe(true);
  });

  it('reads from default entry file', () => {
    process.argv = ['node', 'typescript-documentation'];
    expect(runCLI().options.entry).toEqual(resolve(process.cwd(), 'src/index.ts'));
  });

  it('reads entry file path from command line options (long)', () => {
    process.argv = ['node', 'typescript-documentation', '--entry', './src/main.ts'];
    expect(runCLI().options.entry).toEqual(resolve(process.cwd(), 'src/main.ts'));
  });

  it('reads entry file path from command line options (short)', () => {
    process.argv = ['node', 'typescript-documentation', '-e', './src/main.ts'];
    expect(runCLI().options.entry).toEqual(resolve(process.cwd(), 'src/main.ts'));
  });

  it('reads entry file path from command line options (absolute)', () => {
    const path = resolve(process.cwd(), 'src/main.ts');
    process.argv = ['node', 'typescript-documentation', '--entry', path];
    expect(runCLI().options.entry).toEqual(path);
  });

  it('reads output file from command line options (long)', () => {
    process.argv = ['node', 'typescript-documentation', '--output', 'test.md'];
    expect(runCLI().outputFile).toEqual('test.md');
  });

  it('reads output file from command line options (short)', () => {
    process.argv = ['node', 'typescript-documentation', '-o', 'test.md'];
    expect(runCLI().outputFile).toEqual('test.md');
  });

  it('writes markdown to provided output file (absolute)', () => {
    const path = resolve(process.cwd(), 'test.md');
    process.argv = ['node', 'typescript-documentation', '--output', path];
    expect(runCLI().outputFile).toEqual(path);
  });
});
