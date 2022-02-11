import {  chain, Rule } from '@angular-devkit/schematics';
import { Schema } from './schema';
import { createFeatureStructureRule } from './utils/create-feature-structure-rule';


// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export default function (_options: Schema): Rule {
  
  return chain([
    createFeatureStructureRule(_options)
  ]);
}

export function capitalize(value: string) : string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
