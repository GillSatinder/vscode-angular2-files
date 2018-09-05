import { window, workspace, TextEditor, commands, Uri, WorkspaceEdit } from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { IConfig } from './models/config';
import { IPath } from './models/path';
import { FileContents } from './file-contents';
import { IFiles } from './models/file';
import { promisify } from './promisify';
import { toCamelCase, toUpperCase } from './formatting';
import {
  createFiles, createFiles2, createFiles3, createFiles4, createFiles5, createFiles6, createFiles7, createSameFiles, createFolder, createFolder2,
  createFolder3, createFolder4, createFolder5, createFolder6, createFolder7,
} from './ioutil';
import { TemplateType } from './enums/template-type';
import { resources } from './resources';
import { ResourceType } from './enums/resource-type';
import { OptionType } from './enums/option-type';

const fsWriteFile = promisify(fs.writeFile);
const fsReaddir = promisify(fs.readdir);
const fsStat = promisify(fs.stat);
const fsReadFile = promisify(fs.readFile);

export class AngularCli {


  constructor(private readonly fc = new FileContents()) {
    fc.loadTemplates();
  }

  private async findModulePathRecursive(dir, fileList, optionalFilterFunction) {
    if (!fileList) {
      console.error('Variable \'fileList\' is undefined or NULL.');
      return;
    }
    const files: string[] = await fsReaddir(dir);
    for (const i in files) {
      if (!files.hasOwnProperty(i)) {
        continue;
      }
      const name = path.join(dir, files[i]);
      const stat: fs.Stats = await fsStat(name);

      if (stat.isDirectory()) {
        await this.findModulePathRecursive(name, fileList, optionalFilterFunction);
      } else {
        if (optionalFilterFunction && optionalFilterFunction(name) !== true) {
          continue;
        }
        fileList.push(name);
      }
    }
  }

  private addToImport(data: string, fileName: string, type: string, relativePath: string) {
    const typeUpper = toUpperCase(type);
    const fileNameUpper = toUpperCase(fileName);

    const lastImportInx = data.lastIndexOf('import ');

    const endOfLastImportInx = data.indexOf('\n', lastImportInx);
    const fileLength = data.length;
    return data.substring(0, endOfLastImportInx) + `\nimport { ${fileNameUpper}${typeUpper} } from '${relativePath}/${fileName}.${type}';` + data.substring(endOfLastImportInx, fileLength);
  }


  private parseNgModule(data: string) {
    const startPattern = '@NgModule(';
    const endPattern = ')';
    const startIndex = data.indexOf(startPattern) + startPattern.length;
    const endIndex = data.indexOf(endPattern, startIndex);
    const ngModuleStr = data.substring(startIndex, endIndex)
      .replace('{', '')
      .replace('}', '')
      .split(' ')
      .join('');

    const before = data.substring(0, startIndex - startPattern.length);
    const after = data.substring(endIndex + 1, data.length);

    const ngModuleTokens = ngModuleStr.split('],');

    const ngModuleTokenPairs = ngModuleTokens.map((t) => {
      const [key, val] = t.split(':');

      const values = val.replace('[', '')
        .replace(']', '')
        .split(',')
        .map(item => item.trim())
        .filter(item => item !== '');

      return [key.trim(), values] as [string, string[]];
    });

    const ngModuleMap = new Map<string, string[]>(ngModuleTokenPairs);

    return {
      data,
      before,
      after,
      ngModuleMap,
      toString: () => {
        const obj = {};
        ngModuleMap.forEach((value, key, map) => {
          obj[key] = value;
        });

        const moduleStr = JSON.stringify(obj, null, 3).split(`"`).join('');
        return before + `@NgModule(${moduleStr})` + after;
      },
    };
  }

  private addToArray(ngModule, fileName: string, type: string, prop: string) {
    const item = `${toUpperCase(fileName)}${toUpperCase(type)}`;
    if (ngModule.ngModuleMap.has(prop)) {
      const items = ngModule.ngModuleMap.get(prop);
      items.push(item);
    } else {
      ngModule.ngModuleMap.set(prop, [item]);
    }
  }

  private getRelativePath(dst: string, src: string) {
    const modulePath = path.parse(dst).dir;
    return '.' + src.replace(modulePath, '').replace(/\\/g, '/');
  }

  private async addDeclarationsToModule(loc: IPath, type: string, module: string, exports: boolean = false) {
    const condition = (name: string) => module ? name.includes(`${module}.module.ts`) : name.includes('.module.ts');

    const moduleFiles = [];
    await this.findModulePathRecursive(loc.rootPath, moduleFiles, condition);

    // at least one module is there
    if (moduleFiles.length > 0) {
      moduleFiles.sort((a: string, b: string) => path.dirname(a).length - path.dirname(b).length);

      // find closest module      
      let [module] = moduleFiles;
      let minDistance = Infinity;

      for (const moduleFile of moduleFiles) {
        const moduleDirPath = path.parse(moduleFile).dir;
        const locPath = loc.dirPath.replace(loc.dirName, '');

        const distance = Math.abs(locPath.length - moduleDirPath.length);
        if (distance < minDistance) {
          minDistance = distance;
          module = moduleFile;
        }
      }

      const data: string = await fsReadFile(module, 'utf8');

      // relativePath
      const relativePath = this.getRelativePath(module, loc.dirPath);
      const content = this.addToImport(data, loc.fileName, type, relativePath);

      const ngModule = this.parseNgModule(content);

      this.addToArray(ngModule, loc.fileName, type, 'declarations');
      if (exports) {
        this.addToArray(ngModule, loc.fileName, type, 'exports');
      }

      await fsWriteFile(module, ngModule.toString());
    }
  }

  async generateResources(name: ResourceType, loc: IPath, config: IConfig) {
    const resource = resources.get(name);


    loc.dirName = resource.hasOwnProperty('locDirName') ? resource.locDirName(loc, config) : loc.dirName;
    loc.dirPath = resource.hasOwnProperty('locDirPath') ? resource.locDirPath(loc, config) : loc.dirPath;

    loc.dirName2 = resource.hasOwnProperty('locDirName2') ? resource.locDirName2(loc, config) : loc.dirName2;
    loc.dirPath2 = resource.hasOwnProperty('locDirPath2') ? resource.locDirPath2(loc, config) : loc.dirPath2;

    loc.dirName3 = resource.hasOwnProperty('locDirName3') ? resource.locDirName3(loc, config) : loc.dirName3;
    loc.dirPath3 = resource.hasOwnProperty('locDirPath3') ? resource.locDirPath3(loc, config) : loc.dirPath3;

    loc.dirName4 = resource.hasOwnProperty('locDirName4') ? resource.locDirName4(loc, config) : loc.dirName4;
    loc.dirPath4 = resource.hasOwnProperty('locDirPath4') ? resource.locDirPath4(loc, config) : loc.dirPath4;

    loc.dirName5 = resource.hasOwnProperty('locDirName5') ? resource.locDirName5(loc, config) : loc.dirName5;
    loc.dirPath5 = resource.hasOwnProperty('locDirPath5') ? resource.locDirPath5(loc, config) : loc.dirPath5;

    loc.dirName6 = resource.hasOwnProperty('locDirName6') ? resource.locDirName6(loc, config) : loc.dirName6;
    loc.dirPath6 = resource.hasOwnProperty('locDirPath6') ? resource.locDirPath6(loc, config) : loc.dirPath6;

    loc.dirName7 = resource.hasOwnProperty('locDirName7') ? resource.locDirName7(loc, config) : loc.dirName7;
    loc.dirPath7 = resource.hasOwnProperty('locDirPath7') ? resource.locDirPath7(loc, config) : loc.dirPath7;

    if (resource.hasOwnProperty('declaration') &&
      resource.declaration &&
      !config.defaults[name].skipImport) {
      await this.addDeclarationsToModule(loc, resource.declaration, config.defaults[name].module, config.defaults[name].export);
    }

    const files: IFiles[] = resource.files.filter(file => (file.condition) ? file.condition(config, loc.params) : true).map((file) => {
      const fileName: string = file.name(config);
      return {
        name: path.join(loc.dirPath, fileName.startsWith('-') ? `${loc.fileName}${fileName}` : `${loc.fileName}.${fileName}`),
        content: this.fc.getTemplateContent(file.type, config, loc.fileName, loc.params),
      };
    });
     // for models
    const files2: IFiles[] = resource.files2.filter(file2 => (file2.condition) ? file2.condition(config, loc.params) : true).map((file2) => {
      const fileName2: string = file2.name(config);
      return {
        name: path.join(loc.dirPath2, `${loc.fileName}${fileName2}`),
        content: this.fc.getTemplateContent(file2.type, config, loc.fileName, loc.params),

      };
    });
   //   for models 
    // const sameFiles: IFiles[] = resource.files2.filter(file2 => (file2.condition) ? file2.condition(config, loc.params) : true).map((file2) => {
    //   const fileName2: string = file2.name(config);
    //   return {
    //    // name: path.join(loc.dirPath2, `${loc.fileName}${fileName2}`),
    //    name: path.join(loc.dirPath2, ); 
    //    content: this.fc.getTemplateContent(file2.type, config, loc.fileName2, loc.params),
    //   };
    // });



     // for store
    const files3: IFiles[] = resource.files3.filter(file3 => (file3.condition) ? file3.condition(config, loc.params) : true).map((file3) => {
      const fileName3: string = file3.name(config);
      const test = {
        name: path.join(loc.dirPath3, `${loc.fileName}.${fileName3}`),
        content: this.fc.getTemplateContent(file3.type, config, loc.fileName, loc.params),
      };
      return test;
    });
    
    const storeFiles: IFiles [] = resource.files3.filter(file3 => (file3.condition) ? file3.condition(config, loc.params) : true).map((file3) => {
      const fileName3: string = file3.name(config);
      return {
        name: path.join(loc.dirPath3, fileName3.startsWith('-') ? `${loc.fileName3}${fileName3}` : `${loc.fileName3}.${fileName3}`),
        content: this.fc.getTemplateContent(file3.type, config, loc.fileName3, loc.params),
      };
    });


    // -----------store files------------
    const files4: IFiles[] = resource.files4.filter(file4 => (file4.condition) ? file4.condition(config, loc.params) : true).map((file4) => {
      const fileName4: string = file4.name(config);
      return {
        name: path.join(loc.dirPath4, fileName4.startsWith('-') ? `${loc.fileName4}${fileName4}` : `${loc.fileName4}.${fileName4}`),
        content: this.fc.getTemplateContent(file4.type, config, loc.fileName4, loc.params),
      };
    });

    const files5: IFiles[] = resource.files5.filter(file5 => (file5.condition) ? file5.condition(config, loc.params) : true).map((file5) => {
      const fileName5: string = file5.name(config);
    
      return {
        name: path.join(loc.dirPath5, fileName5.startsWith('-') ? `${loc.fileName5}${fileName5}` : `${loc.fileName5}.${fileName5}`),
        content: this.fc.getTemplateContent(file5.type, config, loc.fileName5, loc.params),
      
      };
    });

    const files6: IFiles[] = resource.files6.filter(file6 => (file6.condition) ? file6.condition(config, loc.params) : true).map((file6) => {
      const fileName6: string = file6.name(config);
      return {
        name: path.join(loc.dirPath6, fileName6.startsWith('-') ? `${loc.fileName6}${fileName6}` : `${loc.fileName6}.${fileName6}`),
        content: this.fc.getTemplateContent(file6.type, config, loc.fileName6, loc.params),
      };
    });

    const files7: IFiles[] = resource.files7.filter(file7 => (file7.condition) ? file7.condition(config, loc.params) : true).map((file7) => {
      const fileName7: string = file7.name(config);
      return {
        name: path.join(loc.dirPath7, fileName7.startsWith('-') ? `${loc.fileName7}${fileName7}` : `${loc.fileName7}.${fileName7}`),
        content: this.fc.getTemplateContent(file7.type, config, loc.fileName7, loc.params),
      };
    });



    if (resource.hasOwnProperty('createFolder') && resource.createFolder(config)) {

      await createFolder(loc);
      await createFolder2(loc);
      await createFolder3(loc);
      await createFolder4(loc);
      await createFolder5(loc);
      await createFolder6(loc);
      await createFolder7(loc);
    }
    await createFiles(loc, files);
    await createFiles2(loc, files2);
    await createFiles3(loc, files3);
    await createFiles4(loc, files4);
    await createFiles5(loc, files5);
    await createFiles6(loc, files6);
    await createFiles7(loc, files7);
   // await createSameFiles(loc, sameFiles);



  }
}
