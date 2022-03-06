import {  chain, Rule, Tree } from '@angular-devkit/schematics';
import { addPermission } from '../../utils/ast';
import { Schema } from './schema';
import { createFeatureStructureRule } from './utils/create-feature-structure-rule';



// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export default function (_options: Schema): Rule {
  
  return chain([
    createFeatureStructureRule(_options),
    // TODO
    modifyPermissionFile(_options)
  ]);
}

export function capitalize(value: string) : string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function modifyPermissionFile(options: Schema) {
  return async (host: Tree) => {
    const permissionPath =  `/src/app/shared/permission.ts`;
    // const permissionPath = '\\src\\ng-generate\\front-feature\\utils\\permission.ts'
    addPermission(host, permissionPath,options.name+'_AssignToSite',options.name+'_Assign_To_Site');
  };
}
