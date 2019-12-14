import { testDocumentation } from './utils';

describe('functions', () => {
  it('documents exported functions', () => {
    testDocumentation({
      'index.ts': `
        /**
         * Simple function description
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
        export function simpleFunction(a: string, b?: number): string {
          return a;
        }
      `,
      markdown: `
        ## simpleFunction(a, b)
        Simple function description
        line 2

        **PARAMETERS**

        - <code>a: string</code>
        - <code>b?: number</code>

        **RETURNS**

        <code>string</code>

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
        export function simpleFunction(a: string, b: number): string {
          return a + b;
        }
      `,
      markdown: `
        ## simpleFunction(a, b)

        **PARAMETERS**

        - <code>a: string</code>
        - <code>b: number</code>

        **RETURNS**

        <code>string</code>
      `
    });
  });

  it('doesn`t document not exported functions', () => {
    testDocumentation({
      'index.ts': `
        function simpleFunction(a: string, b: number): string {
          return a + b;
        }
      `,
      markdown: ``
    });
  });

  it('doesn`t document internal functions', () => {
    testDocumentation({
      'index.ts': `
        /**
         * @internal
         */
        export function simpleFunction(a: string, b: number): string {
          return a + b;
        }
      `,
      markdown: ``
    });
  });
});
