import { testDocumentation } from './utils';

describe('variables', () => {
  it('renders exported variables', () => {
    testDocumentation(
      {
        'index.ts': `
/**
 * Simple variable description
 * line 2
 */
export const simpleVariable = 1;
        `
      },
      `
# [simpleVariable](#simple-variable)
Simple variable description
line 2
##### Type
      `
    );
  });

  it('doesn`t render not exported variables', () => {
    testDocumentation(
      {
        'index.ts': `
const simpleVariable = 1;
        `
      },
      `
      `
    );
  });
});
