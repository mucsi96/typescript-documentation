import expect from 'expect';
import {
  createTestDocumentation,
  removePadding,
  testDocumentation
} from './utils';

describe('symbol', () => {
  it('documents in same order as in source', () => {
    testDocumentation({
      'index.ts': `
        export let b: string;
        export let a: number;
      `,
      markdown: `
        ## b

        **TYPE**

        <code>string</code>

        ## a

        **TYPE**

        <code>number</code>
      `
    });
  });

  it('documents sections', () => {
    const docs = createTestDocumentation({
      'index.ts': `
        /**
         * @section one
         */
        export let b: string;
        export let a: number;
      `
    });
    expect(docs.get('one')).toEqual(
      removePadding(`
        ## b

        **TYPE**

        <code>string</code>
      `)
    );

    expect(docs.get('default')).toEqual(
      removePadding(`
        ## a

        **TYPE**

        <code>number</code>
      `)
    );
  });

  it('documents class methods in separate sections', () => {
    const docs = createTestDocumentation({
      'index.ts': `
        /**
         * @section one
         */
        export class SimpleClass {
          public simpleMethod1(): void {}

          /**
           * @section two
           */
          public simpleMethod2(): void {}
        }
      `
    });
    expect(docs.get('one')).toEqual(
      removePadding(`
        ## SimpleClass
      `)
    );

    expect(docs.get('default')).toEqual(
      removePadding(`
        ## simpleClass.simpleMethod1()

        **RETURNS**

        <code>void</code>
      `)
    );

    expect(docs.get('two')).toEqual(
      removePadding(`
        ## simpleClass.simpleMethod2()

        **RETURNS**

        <code>void</code>
      `)
    );
  });

  it('creates cross section links', () => {
    const docs = createTestDocumentation({
      'index.ts': `
        /**
         * @section one
         */
        export type TypeInOtherSection = {};
        export let a: TypeInOtherSection;
      `
    });
    expect(docs.get('default')).toEqual(
      removePadding(`
        ## a

        **TYPE**

        <code>[TypeInOtherSection](one.md#typeinothersection)</code>
      `)
    );
  });
});
