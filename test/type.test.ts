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
});
