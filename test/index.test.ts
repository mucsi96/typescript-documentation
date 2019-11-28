/* eslint-disable mocha/no-hooks-for-single-case, mocha/no-top-level-hooks */
import { prepare, cleanup } from './utils';

before(() => {
  prepare();
});

after(() => {
  cleanup();
});
