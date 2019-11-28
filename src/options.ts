import { isAbsolute, resolve } from 'path';

export type TOptions = {
  project?: string;
  entry?: string;
  output?: string;
  section?: string;
};

export function createConfigurationFromOptions(
  options: TOptions
): { tsConfig: string; entry: string } {
  const { project: tsConfig = './tsconfig.json', entry = './src/index.ts' } = options;

  return {
    tsConfig: isAbsolute(tsConfig) ? tsConfig : resolve(process.cwd(), tsConfig),
    entry: isAbsolute(entry) ? entry : resolve(process.cwd(), entry)
  };
}
