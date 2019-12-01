import { testDocumentation } from './utils';
import expect from 'expect';

describe.skip('createDocumentation', () => {
  it('throws TypeScript errors', () => {
    expect(() => testDocumentation({ 'index.ts': 'const a;', markdown: '' })).toThrowError(
      "'const' declarations must be initialized."
    );
  });
});
