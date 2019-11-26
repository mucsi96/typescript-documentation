import { testDocumentation } from './utils';

describe('variables', () => {
  it('renders exported variables', () => {
    testDocumentation({
      'index.ts': `
        /**
         * Simple variable description
         * line 2
         */
        export const simpleVariable: number = 1;
      `,
      markdown: `
        # [simpleVariable](#simple-variable)
        Simple variable description
        line 2
        ##### Type
        \`number\`
      `
    });
  });

  it('doesn`t render not exported variables', () => {
    testDocumentation({
      'index.ts': `
        const simpleVariable = 1;
      `,
      markdown: ``
    });
  });
});
