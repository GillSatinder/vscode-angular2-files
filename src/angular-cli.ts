import { window, workspace, TextEditor, commands, Uri, WorkspaceEdit } from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { IConfig } from './models/config';
import { IPath } from './models/path';
import { FileContents } from './file-contents';
import { IFiles } from './models/file';
import { promisify } from './promisify';
import { toCamelCase, toUpperCase } from './formatting';
import { createFiles, createFolder, createFolder2, createFolder3, createFolder4, createFolder5, createFolder6, createFolder7 } from './ioutil';
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
    
    // edited
    // this is not letting anyhthing happening.
    loc.dirName2 = resource.hasOwnProperty('locDirName2') ? resource.locDirName2(loc, config) : loc.dirName2;
    console.log('this is the name of second direc name 2' + loc.dirName2);
    // loc.dirName2 = loc.dirName + '\\models';
    loc.dirPath2 = resource.hasOwnProperty('locDirPath2') ? resource.locDirPath2(loc, config) : loc.dirPath2;
    
    loc.dirName3 = resource.hasOwnProperty('locDirName3') ? resource.locDirName3(loc, config) : loc.dirName3;
    console.log('this is the name of second direc name 3 ' + loc.dirName3);
    // loc.dirName2 = loc.dirName + '\\models';
    loc.dirPath3 = resource.hasOwnProperty('locDirPath3') ? resource.locDirPath3(loc, config) : loc.dirPath3;

    loc.dirName4 = resource.hasOwnProperty('locDirName4') ? resource.locDirName4(loc, config) : loc.dirName4;
    console.log('this is the name of second direc name 4 ' + loc.dirName4);
    // loc.dirName2 = loc.dirName + '\\models';
    loc.dirPath4 = resource.hasOwnProperty('locDirPath4') ? resource.locDirPath4(loc, config) : loc.dirPath4;

    loc.dirName5 = resource.hasOwnProperty('locDirName5') ? resource.locDirName5(loc, config) : loc.dirName5;
    console.log('this is the name of second direc name 5 ' + loc.dirName5);
    // loc.dirName2 = loc.dirName + '\\models';
    loc.dirPath5 = resource.hasOwnProperty('locDirPath5') ? resource.locDirPath5(loc, config) : loc.dirPath5;

    loc.dirName6 = resource.hasOwnProperty('locDirName6') ? resource.locDirName6(loc, config) : loc.dirName6;
    console.log('this is the name of second direc name 6 ' + loc.dirName6);
    // loc.dirName2 = loc.dirName + '\\models';
    loc.dirPath6 = resource.hasOwnProperty('locDirPath6') ? resource.locDirPath6(loc, config) : loc.dirPath6;

    loc.dirName7 = resource.hasOwnProperty('locDirName7') ? resource.locDirName7(loc, config) : loc.dirName7;
    console.log('this is the name of second direc name 7 ' + loc.dirName7);
    // loc.dirName2 = loc.dirName + '\\models';
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
  
  }
}
