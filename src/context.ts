import { Symbol, TypeChecker } from 'typescript';

export type Context = {
  typeChecker: TypeChecker;
  exportedSymbols: Symbol[];
  section: string;
  getSectionLocation: (section: string) => string;
};
