import { testDocumentation } from './utils';

describe('dependencies', () => {
  it('documents in same order as in source', () => {
    testDocumentation({
      'index.ts': `
        export let b: string;
        export let a: number;
      `,
      markdown: `
        ## b

        **TYPE**

        \`string\`

        ## a

        **TYPE**

        \`number\`
      `
    });
  });
});
