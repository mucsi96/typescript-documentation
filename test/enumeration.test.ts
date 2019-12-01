import { testDocumentation } from './utils';

describe('enumerations', () => {
  it('documents exported enumerations', () => {
    testDocumentation({
      'index.ts': `
        /**
         * Simple enumeration description
         * line 2
         * @see {@link https://test.url.1|Example url 1}
         * @see {@link https://test.url.2|Example url 2}
         * @example
         * example 1 line 1
         * example 1 line 2
         * @example
         * example 2 line 1
         * example 2 line 2
         */
        export enum SimpleEnum { ONE, TWO };
      `,
      markdown: `
        ## SimpleEnum
        Simple enumeration description
        line 2

        **POSSIBLE VALUES**

        - \`ONE\`
        - \`TWO\`

        **EXAMPLES**

        \`\`\`typescript
        example 1 line 1
        example 1 line 2
        \`\`\`
        \`\`\`typescript
        example 2 line 1
        example 2 line 2
        \`\`\`

        **SEE ALSO**

        - [Example url 1](https://test.url.1)
        - [Example url 2](https://test.url.2)
      `
    });
  });

  it('documents minimal information', () => {
    testDocumentation({
      'index.ts': `
        export enum SimpleEnum {};
      `,
      markdown: `
        ## SimpleEnum
      `
    });
  });

  it('doesn`t document not exported enumerations', () => {
    testDocumentation({
      'index.ts': `
        enum SimpleEnum { ONE, TWO };
      `,
      markdown: ``
    });
  });
});
