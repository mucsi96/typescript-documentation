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

        <code>string</code>

        ## a

        **TYPE**

        <code>number</code>
      `
    });
  });
});
