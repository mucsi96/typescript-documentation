import { createProgram, TypeFlags, CompilerHost, createSourceFile, ScriptTarget } from 'typescript';
import marked from 'marked';

const entryFile = 'variables.ts';
const sourceCode: { [name: string]: string } = {
  'variables.ts': `
        import { B } from "./b";

        export const a = 1;
        export const b: B = 1;
    `,
  'b.ts': `
        export type B = 1;
    `
};

const compilerHost: CompilerHost = {
  getSourceFile: name => createSourceFile(name, sourceCode[name] || '', ScriptTarget.Latest),
  writeFile: () => {},
  getDefaultLibFileName: () => 'lib.d.ts',
  useCaseSensitiveFileNames: () => false,
  getCanonicalFileName: filename => filename,
  getCurrentDirectory: () => '',
  getNewLine: () => '\n',
  getDirectories: () => [],
  fileExists: () => true,
  readFile: () => ''
};

const program = createProgram({
  rootNames: [entryFile],
  options: {
    esModuleInterop: true,
    strict: true,
    skipLibCheck: true
  },
  host: compilerHost
});

const typeChecker = program.getTypeChecker();
const root = program.getSourceFile(entryFile);

if (!root) {
  throw new Error('No root');
}

const type = typeChecker.getSymbolAtLocation(root);

if (type) {
  const exportedSymbols = typeChecker.getExportsOfModule(type);
  exportedSymbols.forEach(symbol => {
    console.log(symbol.getName());
    const declarations = symbol.getDeclarations();
    if (declarations) {
      declarations.forEach(d => {
        const type = typeChecker.getTypeAtLocation(d);

        if (type.getFlags() | TypeFlags.Number) {
          console.log('number');
        }
        console.log(typeChecker.typeToString(type));
      });
    }
  });
}

const contentNode = document.getElementById('content');

if (contentNode) {
  contentNode.innerHTML = marked('# Marked in the browser\n\nRendered by **marked**.');
}
