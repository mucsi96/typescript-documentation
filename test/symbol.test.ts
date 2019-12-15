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
});
