import { testDocumentation } from './utils';

describe('type', () => {
  it('documents union type', () => {
    testDocumentation({
      'index.ts': `
        export const SimpleUnion: string | number;
      `,
      markdown: `
        ## SimpleUnion

        **TYPE**

        \`string | number\`
      `
    });
  });

  it('documents object type', () => {
    testDocumentation({
      'index.ts': `
        type SimpleObjectType = {}
        export const instance: SimpleObjectType;
      `,
      markdown: `
        ## instance

        **TYPE**

        \`[SimpleObjectType](#simple-object-type)\`
      `
    });
  });
});
