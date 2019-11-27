import { testDocumentation } from './utils';

describe('classes', () => {
  it('documents exported classes', () => {
    testDocumentation({
      'index.ts': `
        /**
         * Simple class description
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
        export class SimpleClass {
          /**
           * simpleMethod1 description
           * line 2
           * @see {@link https://test.url.3|Example url 3}
           * @see {@link https://test.url.4|Example url 4}
           * @example
           * example 3 line 1
           * example 3 line 2
           * @example
           * example 4 line 1
           * example 4 line 2
           */
          public simpleMethod1(): void {
            return;
          }

          /**
           * simpleMethod2 description
           * line 2
           */
          public simpleMethod2(a: string, b: number): string {
            return a + b;
          }
        }
      `,
      markdown: `
      ## [SimpleClass](#simple-class)
      Simple class description
      line 2

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

      ## [simpleClass.simpleMethod1()](#simple-class-simple-method1)
      simpleMethod1 description
      line 2

      **RETURNS**

      \`void\`

      **EXAMPLES**

      \`\`\`
      example 3 line 1
      example 3 line 2
      \`\`\`
      \`\`\`
      example 4 line 1
      example 4 line 2
      \`\`\`

      **SEE ALSO**

      - [Example url 3](https://test.url.3)
      - [Example url 4](https://test.url.4)

      ## [simpleClass.simpleMethod2(a, b)](#simple-class-simple-method2)
      simpleMethod2 description
      line 2

      **PARAMETERS**

      - \`a: string\`
      - \`b: number\`

      **RETURNS**

      \`string\`
      `
    });
  });

  it('doesn`t document not exported classes', () => {
    testDocumentation({
      'index.ts': `
        class SimpleClass {}
      `,
      markdown: ``
    });
  });
});
