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

        <code>string | number</code>
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

        <code>SimpleObjectType</code>
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

        <code>[SimpleObjectType](#simpleobjecttype)</code>
      `
    });
  });

  it('doesn`t documents internal objects', () => {
    testDocumentation({
      'index.ts': `
        /**
         * @internal
         */
        export type SimpleObjectType = {};
        export let testVariable: SimpleObjectType;
      `,
      markdown: `
        ## testVariable

        **TYPE**

        <code>SimpleObjectType</code>
      `
    });
  });

  it('references to types', () => {
    testDocumentation({
      'index.ts': `
      export type UnionType = string | number;
      export let testVariable: UnionType;
      `,
      markdown: `
        ## UnionType

        **POSSIBLE VALUES**

        - <code>string</code>
        - <code>number</code>

        ## testVariable

        **TYPE**

        <code>[UnionType](#uniontype)</code>

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

        <code>any</code>
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

        <code>InterfaceType</code>
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

        <code>[InterfaceType](#interfacetype)</code>
      `
    });
  });

  it('doesn`t documents internal interfaces', () => {
    testDocumentation({
      'index.ts': `
        /**
         * @internal
         */
        export interface InterfaceType {};
        export let testVariable: InterfaceType;
      `,
      markdown: `
        ## testVariable

        **TYPE**

        <code>InterfaceType</code>
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

        <code>'test string literal'</code>
      `
    });
  });

  it('documents nulls', () => {
    testDocumentation({
      'index.ts': `
        export let testVariable: null;
      `,
      markdown: `
        ## testVariable

        **TYPE**

        <code>null</code>
      `
    });
  });

  it('documents booleans', () => {
    testDocumentation({
      'index.ts': `
        export let testVariable: boolean;
      `,
      markdown: `
        ## testVariable

        **TYPE**

        <code>boolean</code>
      `
    });
  });

  it('documents typed arrays', () => {
    testDocumentation({
      'index.ts': `
        export let testVariable: string[];
      `,
      markdown: `
        ## testVariable

        **TYPE**

        <code>string[]</code>
      `
    });
  });

  it('documents type arguments', () => {
    testDocumentation({
      'index.ts': `
        export let testVariable: Promise<string>;
      `,
      markdown: `
        ## testVariable

        **TYPE**

        <code>Promise\\<string\\></code>
      `
    });
  });

  it('documents functions with type parameter', () => {
    testDocumentation({
      'index.ts': `
        export function simpleFunction<T>(): Promise<T> {}
      `,
      markdown: `
      ## simpleFunction\\<T\\>()

      **RETURNS**

      <code>Promise\\<T\\></code>
      `
    });
  });

  it('documents exported object arrays', () => {
    testDocumentation({
      'index.ts': `
        export type SimpleObjectType = {};
        export let testVariable: SimpleObjectType[];
      `,
      markdown: `
        ## SimpleObjectType

        ## testVariable

        **TYPE**

        <code>[SimpleObjectType](#simpleobjecttype)[]</code>
      `
    });
  });

  it('documents anonymous type', () => {
    testDocumentation({
      'index.ts': `
        export let testVariable: { a: string };
      `,
      markdown: `
        ## testVariable

        **TYPE**

        <code>[SimpleObjectType](#simpleobjecttype)[]</code>
      `
    });
  });
});
