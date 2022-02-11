import { strings } from '@angular-devkit/core';
import { apply, mergeWith, move, Rule, SchematicContext, template, Tree, url } from '@angular-devkit/schematics';
import { Schema } from './schema';


// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export default function (_options: Schema): Rule {
  
  // const filesPath = _options.name+'Module/Aggregate/';
  const projectName = process.cwd().split('\\').slice(-1)[0];
  const filesPath = 'backend/Safran.'+projectName+'.Domain/'+_options.name+'Module/Aggregate/';
  
  const sourceTemplate = url("./files");  
  process.chdir('../');
  const sourceParametrizedTemplate = apply(sourceTemplate, [
    template({
      ..._options,
      'if-flat': (s: string) => (_options.flat ? '' : s),
      ...strings
    }),
    move(filesPath)
  ]);
  return mergeWith(sourceParametrizedTemplate);
  return (tree: Tree, _context: SchematicContext) => {
    return tree;
  };
}

export function capitalize(value: string) : string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
