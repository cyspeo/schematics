import { SchematicsException, Tree } from "@angular-devkit/schematics";
import { Change, InsertChange } from "@schematics/angular/utility/change";
import ts = require("typescript");

export function addPermission(
    host: Tree,
    permissionPath: string,
    permissionKey: string,
    permissionValue: string) {
    const permissionSource = parseSourceFile(host, permissionPath);

    if (!permissionSource) {
        throw new SchematicsException(`permission file not found: ${permissionPath}`);
    }
    const changes = addPermissionToPermissionFile(permissionSource, permissionPath, permissionKey, permissionValue);
    const recorder = host.beginUpdate(permissionPath);

    changes.forEach(change => {
        if (change instanceof InsertChange) {
            recorder.insertLeft(change.pos, change.toAdd);
        }
    });

    host.commitUpdate(recorder);
}

/** Reads file given path and returns TypeScript source file. */
export function parseSourceFile(host: Tree, path: string): ts.SourceFile {
    const buffer = host.read(path);
    if (!buffer) {
        throw new SchematicsException(`Could not find file for path: ${path}`);
    }
    return ts.createSourceFile(path, buffer.toString(), ts.ScriptTarget.Latest, true);
}


export function addPermissionToPermissionFile(permissionSource: ts.SourceFile, permissionPath: string, permissionKey: string,
    permissionValue: string): Change[] {

    let closeBraceNode = findNode(permissionSource, ts.SyntaxKind.CloseBraceToken);
    if (closeBraceNode != null) {
                    let permissionToAdd = `
                          ,${permissionKey} = '${permissionValue}' 
                    `
                    return [new InsertChange(permissionPath, closeBraceNode.getStart(), permissionToAdd)];
    }
    return [];
}

export function findNode(node: ts.Node, kind: ts.SyntaxKind): ts.Node | null {
    // console.log("node: "+ts.SyntaxKind[node.kind] + text);
    if (node.kind === kind ) {
        // throw new Error(node.getText());
        return node;
    }

    let foundNode: ts.Node | null = null;
    // ts.forEachChild(node, childNode => {
    //     foundNode = foundNode || findNode(childNode, kind, text);
    // });
    for (let child of node.getChildren()) {
        foundNode = findNode(child, kind);
        if (foundNode?.kind === kind) {
            return foundNode;
        }
    }

    return foundNode;
}    