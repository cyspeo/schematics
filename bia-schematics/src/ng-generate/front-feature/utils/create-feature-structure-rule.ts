import { Rule, template, url, apply, move, mergeWith } from '@angular-devkit/schematics';
import { Schema } from '../schema';
import { strings } from '@angular-devkit/core';

export function createFeatureStructureRule (_options: Schema): Rule {
    return () => {
        const frontFilesPath = 'src/app/features/';
        
        const sourceTemplate = url("./files");  
        process.chdir('../');
        const sourceParametrizedTemplate = apply(sourceTemplate, [
          template({
            ..._options,
            'if-flat': (s: string) => (_options.flat ? '' : s),
            ...strings
          }),
          move(frontFilesPath)
        ]);
        return mergeWith(sourceParametrizedTemplate);

    }
}