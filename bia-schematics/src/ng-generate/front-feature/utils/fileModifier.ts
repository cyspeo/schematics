
import * as ts from 'typescript';
import * as fs from 'fs';

function showTree(node: ts.Node, indent: string = '    '): void {
  // will output the syntax kind of the node
  console.log(indent + ts.SyntaxKind[node.kind]);
  // output the text of node
  if (node.getChildCount() === 0) {
    console.log(indent + '    Text: ' + node.getText());
  }

  // output the children nodes
  for (let child of node.getChildren()) {
    showTree(child, indent + '    ');
  }
}



function fileModifier(path: string) {
  let buffer = fs.readFileSync(path);
  let content = buffer.toString('utf-8');
  // create a typescript source file out of demo.ts
  let node = ts.createSourceFile('demo.ts', content, ts.ScriptTarget.Latest, true);
  showTree(node);

}


fileModifier('./permission.ts');

