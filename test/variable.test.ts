import { testDocumentation } from './utils';

describe('variables', () => {
  it('documents exported variables', () => {
    testDocumentation(
      { 'index.ts': 'export const simpleVariable = 1;' },
      '# [simpleVariable](#simple-variable)'
    );
  });
});
