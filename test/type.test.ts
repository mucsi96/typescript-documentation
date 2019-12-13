import { testDocumentation } from './utils';

describe('type', () => {
  it('documents unions', () => {
    testDocumentation({
      'index.ts': `
        export const testVariable: string | number;
      `,
      markdown: `
        ## testVariable

        **TYPE**

        \`string | number\`
      `
    });
  });

  it('documents objects', () => {
    testDocumentation({
      'index.ts': `
        type SimpleObjectType = {}
        export const testVariable: SimpleObjectType;
      `,
      markdown: `
        ## testVariable

        **TYPE**

        \`[SimpleObjectType](#simple-object-type)\`
      `
    });
  });

  it('documents any', () => {
    testDocumentation({
      'index.ts': `
        export const testVariable: any;
      `,
      markdown: `
        ## testVariable

        **TYPE**

        \`any\`
      `
    });
  });

  it('documents interfaces', () => {
    testDocumentation({
      'index.ts': `
        interface InterfaceType {};
        export const testVariable: InterfaceType;
      `,
      markdown: `
        ## testVariable

        **TYPE**

        \`[InterfaceType](#interface-type)\`
      `
    });
  });

  it('documents string literals', () => {
    testDocumentation({
      'index.ts': `
        export const testVariable: 'test string literal';
      `,
      markdown: `
        ## testVariable

        **TYPE**

        \`test string literal\`
      `
    });
  });

  it('documents null', () => {
    testDocumentation({
      'index.ts': `
        export const testVariable: null;
      `,
      markdown: `
        ## testVariable

        **TYPE**

        \`null\`
      `
    });
  });

  it('documents boolean', () => {
    testDocumentation({
      'index.ts': `
        export const testVariable: boolean;
      `,
      markdown: `
        ## testVariable

        **TYPE**

        \`boolean\`
      `
    });
  });
});
