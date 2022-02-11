import { strings } from '@angular-devkit/core';
import { apply, mergeWith, move, Rule, SchematicContext, template, Tree, url } from '@angular-devkit/schematics';
import { Schema } from './schema';


// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export default function (_options: Schema): Rule {
  
  // const filesPath = _options.name+'Module/Aggregate/';
  const projectName = process.cwd().split('\\').slice(-1)[0];
  const domainProjectPath = 'backend/Safran.'+projectName+'.Domain/';
  const aggregatFilesPath = domainProjectPath+_options.aggregat+'Module/Aggregate/';
   
  
  const sourceTemplate = url("./files");  
  process.chdir('../');
  const sourceParametrizedTemplate = apply(sourceTemplate, [
    template({
      ..._options,
      'if-flat': (s: string) => (_options.flat ? '' : s),
      ...strings
    }),
    move(aggregatFilesPath)
  ]);
  return mergeWith(sourceParametrizedTemplate);
}

export function capitalize(value: string) : string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
