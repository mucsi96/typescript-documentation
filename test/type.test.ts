import { testDocumentation } from './utils';

describe('type', () => {
  it('documents unions', () => {
    testDocumentation({
      'index.ts': `
        export let testVariable: string | number;
      `,
      markdown: `
        ## testVariable

        **TYPE**

        \`string\` | \`number\`
      `
    });
  });

  it('documents objects', () => {
    testDocumentation({
      'index.ts': `
        type SimpleObjectType = {}
        export let testVariable: SimpleObjectType;
      `,
      markdown: `
        ## testVariable

        **TYPE**

        \`SimpleObjectType\`
      `
    });
  });

  it('documents exported objects', () => {
    testDocumentation({
      'index.ts': `
        export type SimpleObjectType = {};
        export let testVariable: SimpleObjectType;
      `,
      markdown: `
        ## SimpleObjectType
        ## testVariable

        **TYPE**

        [\`SimpleObjectType\`](#simpleobjecttype)
      `
    });
  });

  it('documents any', () => {
    testDocumentation({
      'index.ts': `
        export let testVariable: any;
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
        export let testVariable: InterfaceType;
      `,
      markdown: `
        ## testVariable

        **TYPE**

        \`InterfaceType\`
      `
    });
  });

  it('documents exported interfaces', () => {
    testDocumentation({
      'index.ts': `
        export interface InterfaceType {};
        export let testVariable: InterfaceType;
      `,
      markdown: `
        ## InterfaceType
        ## testVariable

        **TYPE**

        [\`InterfaceType\`](#interfacetype)
      `
    });
  });

  it('documents string literals', () => {
    testDocumentation({
      'index.ts': `
        export let testVariable: 'test string literal';
      `,
      markdown: `
        ## testVariable

        **TYPE**

        \`'test string literal'\`
      `
    });
  });

  it('documents null', () => {
    testDocumentation({
      'index.ts': `
        export let testVariable: null;
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
        export let testVariable: boolean;
      `,
      markdown: `
        ## testVariable

        **TYPE**

        \`boolean\`
      `
    });
  });

  it('documents array', () => {
    testDocumentation({
      'lib.d.ts': `
        interface Array<T> {}
      `,
      'index.ts': `
        export let testVariable: string[];
      `,
      markdown: `
        ## testVariable

        **TYPE**

        \`string[]\`
      `
    });
  });
});
