import { Tree } from "@angular-devkit/schematics";
import { Change } from "@schematics/angular/utility/change";
import ts = require("typescript");
export declare function addPermission(host: Tree, permissionPath: string, permissionKey: string, permissionValue: string): void;
/** Reads file given path and returns TypeScript source file. */
export declare function parseSourceFile(host: Tree, path: string): ts.SourceFile;
export declare function addPermissionToPermissionFile(permissionSource: ts.SourceFile, permissionPath: string, permissionKey: string, permissionValue: string): Change[];
export declare function findNode(node: ts.Node, kind: ts.SyntaxKind): ts.Node | null;
