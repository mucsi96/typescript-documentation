/* eslint-disable mocha/no-hooks-for-single-case, mocha/no-top-level-hooks */
import { prepare, cleanup, testDocumentation } from './utils';
import expect from 'expect';

before(() => {
  prepare();
});

after(() => {
  cleanup();
});

describe('createDocumentation', () => {
  it('throws TypeScript errors', () => {
    expect(() => testDocumentation({ 'index.ts': 'const a;', markdown: '' })).toThrowError(
      "'const' declarations must be initialized."
    );
  });
});
