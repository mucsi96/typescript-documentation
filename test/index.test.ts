import { prepare, cleanup } from './utils';

before(() => {
  prepare();
});

after(() => {
  cleanup();
});
