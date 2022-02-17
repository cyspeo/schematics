# Getting Started With Schematics

This repository is a basic Schematic implementation that serves as a starting point to create and publish Schematics to NPM.

### Testing

To test locally, install `@angular-devkit/schematics-cli` globally and use the `schematics` command line tool. That tool acts the same as the `generate` command of the Angular CLI, but also has a debug mode.

Check the documentation with

```bash
schematics --help
```

### Unit Testing

`npm run test` will run the unit tests, using Jasmine as a runner and test framework.

### Publishing

To publish, simply do:

```bash
npm run build
npm publish
```

That's it!


# Compil
Dans le répertoire bia
- npm run build:watch

# Links
* http://blog.ezoqc.com/generer-du-code-avec-les-schemas-angular/
* https://medium.com/humanitec-developers/update-and-insert-auto-generated-code-to-existing-typescript-html-and-json-files-with-angular-f0b00f22fb52
* Very complet : https://tomastrajan.medium.com/total-guide-to-custom-angular-schematics-5c50cf90cdb4
* https://admiquel.medium.com/angular-schematics-how-to-create-an-empty-folder-ecdf7c9e88ba

# run 
Depuis le répertoire bia : 
- schematics .:entity Division -debug=false --dry-run=false

# Publish custom schematics
- This commnand buid the package schematics-bia-1.0.0.tgz
  - ```npm pack```
- Install the package into Angular CLI workspace :

  - ```npm i --no-save schematics-bia-1.0.0.tgz```

