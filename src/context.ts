import { TypeChecker, Symbol } from 'typescript';

export type Context = {
  typeChecker: TypeChecker;
  exportedSymbols: Symbol[];
};
