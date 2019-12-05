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

const contentNode = document.getElementById('content');

if (contentNode) {
  contentNode.innerHTML = marked('# Marked in the browser\n\nRendered by **marked**.');
}
