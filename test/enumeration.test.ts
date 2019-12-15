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
        export enum SimpleEnum { ONE = '\uE000', TWO = 1 };
      `,
      markdown: `
        ## SimpleEnum

        Simple enumeration description
        line 2

        **POSSIBLE VALUES**

        - <code>ONE</code>
        - <code>TWO</code>

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

  it('doesn`t document internal enumerations', () => {
    testDocumentation({
      'index.ts': `
        /**
         * @internal
         */
        export enum SimpleEnum { ONE, TWO };
      `,
      markdown: ``
    });
  });
});
