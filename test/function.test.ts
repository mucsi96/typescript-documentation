import { testDocumentation } from './utils';

describe('functions', () => {
  it('renders exported functions', () => {
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
        export function simpleFunction(a: string, b: number): string {
          return a + b;
        }
      `,
      markdown: `
      # [simpleFunction(a, b)](#simple-function)
      Simple function description
      line 2

      **PARAMETERS**

      - \`a: string\`
      - \`b: number\`

      **RETURNS**

      \`string\`

      **EXAMPLES**

      \`\`\`
      example 1 line 1
      example 1 line 2
      \`\`\`
      \`\`\`
      example 2 line 1
      example 2 line 2
      \`\`\`

      **SEE ALSO**

      - [Example url 1](https://test.url.1)
      - [Example url 2](https://test.url.2)
      `
    });
  });

  it('doesn`t render not exported functions', () => {
    testDocumentation({
      'index.ts': `
        function simpleFunction(a: string, b: number): string {
          return a + b;
        }
      `,
      markdown: ``
    });
  });
});
