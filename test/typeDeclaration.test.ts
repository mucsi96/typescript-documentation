import { testDocumentation } from './utils';

describe('type declarations', () => {
  it('documents exported types', () => {
    testDocumentation({
      'index.ts': `
        /**
         * Simple type description
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
        export type SimpleType = {
          a: string;
          b?: number;
        };
      `,
      markdown: `
        ## SimpleType
        Simple type description
        line 2

        **PROPERTIES**

        - \`a\` : \`string\`
        - \`b?\` : \`number\`

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
        export type SimpleType = {};
      `,
      markdown: `
        ## SimpleType
      `
    });
  });

  it('doesn`t document not exported types', () => {
    testDocumentation({
      'index.ts': `
      type SimpleType = {
        a: string;
        b: number;
      };
      `,
      markdown: ``
    });
  });

  it('documents unions', () => {
    testDocumentation({
      'index.ts': `
      export type UnionType = string | number;
      `,
      markdown: `
      ## UnionType

      **POSSIBLE VALUES**

      - \`string\`
      - \`number\`
      `
    });
  });

  it('documents type with optional boolean', () => {
    testDocumentation({
      'index.ts': `
      export type TypeWithOptionalBoolean = {
        a?: boolean;
      };
      `,
      markdown: `
      ## TypeWithOptionalBoolean

      **PROPERTIES**

      - \`a?\` : \`boolean\`
      `
    });
  });

  it('documents nested object types', () => {
    testDocumentation({
      'index.ts': `
      export type TypeWithOptionalBoolean = {
        a: {
          b: {
            c: string;
          }
        }
      };
      `,
      markdown: `
      ## TypeWithOptionalBoolean

      **PROPERTIES**

      - \`a\` : \`boolean\`
      `
    });
  });
});
