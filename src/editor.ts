import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { IPath } from './models/path';
import { OptionType } from './enums/option-type';
import { ResourceType } from './enums/resource-type';
import { resources } from './resources';
import { optionsCommands } from './option-commands';
import { IConfig } from './models/config';
import { OptionItem } from './models/option-item';

export const displayStatusMessage = (type: string, name: string, timeout = 2000) => vscode.window.setStatusBarMessage(`${type} ${name} was successfully generated`, timeout);

export const openFileInEditor = async (folderName) => {
 
  const inputName = path.parse(folderName).name;

  const fullFilePath = path.join(folderName, `${inputName}.component.ts`);
  const textDocument = await vscode.workspace.openTextDocument(fullFilePath);
  return await vscode.window.showTextDocument(textDocument);
};

// Show input prompt for folder name 
export const showFileNameDialog = async (args, type: ResourceType, defaultTypeName): Promise<IPath> => {
  let clickedFolderPath: string;
  if (args) {
    clickedFolderPath = args.fsPath;
  } else {
    if (!vscode.window.activeTextEditor) {
      throw new Error('Please open a file first.. or just right-click on a file/folder and use the context menu!');
    } else {
      clickedFolderPath = path.dirname(vscode.window.activeTextEditor.document.fileName);
    }
  }

  const rootPath = fs.lstatSync(clickedFolderPath).isDirectory() ? clickedFolderPath : path.dirname(clickedFolderPath);
  
  if (vscode.workspace.rootPath === undefined) {
    throw new Error('Please open a project first. Thanks! :-)');
  } else {
    let fileName = await vscode.window.showInputBox({ prompt: `Type the name of the new ${type}`, value: `${defaultTypeName}` });
    let fileName2 = 'models';
    let fileName3 = 'store';
    let fileName4 = fileName + '-create';
    let fileName5 = fileName + '-edit';
    let fileName6 = fileName + '-form';
    let fileName7 = fileName + '-list';
    const rootPath2 = rootPath + '\\' + fileName;
    const rootPath3 = rootPath2;
    const rootPath4 = rootPath2;
    const rootPath5 = rootPath2;
    const rootPath6 = rootPath2;
    const rootPath7 = rootPath2;
    

    if (!fileName) {
      throw new Error('That\'s not a valid name! (no whitespaces or special characters)');
    } else {
      let dirName = '';
      let dirName2 = '';
      let dirName3 = '';
      let dirName4 = '';
      let dirName5 = '';
      let dirName6 = '';
      let dirName7 = '';

      const [showOptionsCmd] = optionsCommands.get(OptionType.ShowOptions).commands;
      const resoureParamsMap = resources.get(type).options ? resources.get(type).options.map(op => optionsCommands.get(op).commands.map(v => [v, op] as [string, OptionType])) : [];
      const optionsMap = new Map<string, OptionType>(Array.prototype.concat.apply([], [...resoureParamsMap, [[showOptionsCmd, OptionType.ShowOptions]]]));
      const resourceOptionsTags = resources.get(type).options ? Array.prototype.concat.apply([], resources.get(type).options.map(op => optionsCommands.get(op).commands)) : [];
      
      const separators = ['--', ' -'];
      const optionValuesSparator = ['=', ' '];
      const filenameTokens = fileName.split(' ');
      const optionsString = filenameTokens.slice(1, filenameTokens.length).join(' ');
      [fileName] = filenameTokens;
     

      const optionsTokens = optionsString.split(new RegExp(separators.join('|'), 'g'))
        .filter(item => item.trim() !== '')
        .map(item => item.trim())
        .map(item => (item.length === 2) ?  item : '-' + item);

      const params = optionsTokens
        .filter((t) => {
          const [option] = t.split(new RegExp(optionValuesSparator.join('|'), 'g'));
          return resourceOptionsTags.includes(option) || option === showOptionsCmd;
        })
        .map((t) => {
          const [key, value = 'True'] = t.split(new RegExp(optionValuesSparator.join('|'), 'g'));

          return [optionsMap.get(key), value] as [OptionType, string];
        });

      const paramsMap = new Map<OptionType, string>(params);
      const fullPath = path.join(rootPath, fileName);
      const fullPath2 = path.join(rootPath2, fileName2);
      const fullPath3 = path.join(rootPath3, fileName3);
      const fullPath4 = path.join(rootPath4, fileName4);
      const fullPath5 = path.join(rootPath5, fileName5);
      const fullPath6 = path.join(rootPath6, fileName6);
      const fullPath7 = path.join(rootPath7, fileName7);
     

      if (fileName.indexOf('\\') !== -1) {
        [dirName, fileName] = fileName.split('\\');

      
      }
      if (fileName2.indexOf('\\') !== -1) {
        [dirName2, fileName2] = fileName2.split('\\');
      }

      if (fileName3.indexOf('\\') !== -1) {
        [dirName3, fileName3] = fileName3.split('\\');
      }

      if (fileName4.indexOf('\\') !== -1) {
        [dirName4, fileName4] = fileName4.split('\\');
      }

      if (fileName5.indexOf('\\') !== -1) {
        [dirName5, fileName5] = fileName5.split('\\');
      }

      if (fileName6.indexOf('\\') !== -1) {
        [dirName6, fileName6] = fileName6.split('\\');
      }

      if (fileName7.indexOf('\\') !== -1) {
        [dirName7, fileName7] = fileName7.split('\\');
      }
      
      const dirPath = path.join(rootPath, dirName);
      const dirPath2 = path.join(rootPath2, dirName2);
      const dirPath3 = path.join(rootPath3, dirName3);
      const dirPath4 = path.join(rootPath4, dirName4);
      const dirPath5 = path.join(rootPath5, dirName5);
      const dirPath6 = path.join(rootPath6, dirName6);
      const dirPath7 = path.join(rootPath7, dirName7);


      return {
        fullPath,
        fileName,
        dirName,
        dirPath,
        rootPath,
        paramsMap,
        fullPath2,
        fileName2,
        dirName2,
        dirPath2,
        rootPath2,

        fullPath3,
        fileName3,
        dirName3,
        dirPath3,
        rootPath3,

        fullPath4,
        fileName4,
        dirName4,
        dirPath4,
        rootPath4,

        fullPath5,
        fileName5,
        dirName5,
        dirPath5,
        rootPath5,

        fullPath6,
        fileName6,
        dirName6,
        dirPath6,
        rootPath6,

        fullPath7,
        fileName7,
        dirName7,
        dirPath7,
        rootPath7,
        params: [...paramsMap.keys()],
      };
    }
  }
};

const deepValue = (obj, path) => {
  const parts = path.split('.');
  let rv;
  let index;
  // tslint:disable-next-line:no-increment-decrement
  for (rv = obj, index = 0; rv && index < parts.length; ++index) {
    rv = rv[parts[index]];
  }
  return rv;
};



export const showOptionsDialog = async (config: IConfig, loc: IPath, resource: ResourceType): Promise<any> => {
  const resourceOptions = resources.get(resource).options;
  if (!resourceOptions) {
    return null;
  }

  const optionMap = new Map<string, OptionType>(resourceOptions.map((op) => {
    const optionItem = optionsCommands.get(op);
    const [optionCommand] = optionItem.commands;
    const optionName = optionCommand.replace('--', '');
    return [optionName, op] as [string, OptionType];
  }));

  const resourceOptionsChoices = [...optionMap.entries()].map((option) => {
    const [optionName, optionType] = option;
    const optionItem = optionsCommands.get(optionType);
    const resourceConfigPath = optionItem.configPath ? optionItem.configPath.replace('{resource}', resource.toLocaleLowerCase()) : '';
    const optionConfiguredDefaultValue = (optionItem.configPath) ? deepValue(config, resourceConfigPath) || '' : '';
    const selectedValue = loc.paramsMap.has(optionType) ? loc.paramsMap.get(optionType) : '';
    const optionDefaultValue = selectedValue || optionConfiguredDefaultValue;

    const displayValue = (optionDefaultValue && optionDefaultValue !== '') ? `${optionName} (default: ${optionDefaultValue})` : optionName;
    return { label: displayValue, description: optionItem.description, picked: loc.params.includes(optionType) } as vscode.QuickPickItem;
  });

  const selectedOptions = await vscode.window.showQuickPick(resourceOptionsChoices, { canPickMany: true, placeHolder: `Select ${resource} options to override` });
  const selectedOptionTypes = selectedOptions.map(o => o.label.split(' ')[0].trim())
    .map(l => optionMap.get(l));

  return selectedOptionTypes;
};

const asyncForEach = async (array, callback) => {
  // tslint:disable-next-line:no-increment-decrement
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
};

export const configureOptionsValues = async (config: IConfig, loc: IPath, resource: ResourceType, optionTypes: OptionType[]): Promise<Map<OptionType, string>> => {
  const optionsValuesMap = new Map<OptionType, string>();
  await asyncForEach(optionTypes, async (ot) => {
    const optionItem = optionsCommands.get(ot);
    const resourceConfigPath = optionItem.configPath ? optionItem.configPath.replace('{resource}', resource.toLocaleLowerCase()) : '';
    const optionDefaultValue = (optionItem.configPath) ? deepValue(config, resourceConfigPath) || '' : '';
    const [command] = optionItem.commands;
    const items = optionItem.type ? optionItem.type.split('|').map(item => item.trim()) : [];
    const [firstItem = ''] = items;
    const sortedItems = firstItem.toLowerCase() === optionDefaultValue.toString().toLowerCase() ? items.reverse() : items;

    const selectedValue = loc.paramsMap.has(ot) ? loc.paramsMap.get(ot) : '';
    const params = { placeHolder: `${command}: ${optionItem.description}`, value: selectedValue };

    const val = (optionItem.type) ? await vscode.window.showQuickPick(sortedItems, params) : await vscode.window.showInputBox(params);
    optionsValuesMap.set(ot, val);
  });
  return optionsValuesMap;
};


const setToValue = (obj, value, path) => {
  let i;
  let localObj = obj;
  const localPath = path.split('.');

  // tslint:disable-next-line:no-increment-decrement
  for (i = 0; i < localPath.length - 1; i++) {
    localObj = localObj[localPath[i]];
  }

  localObj[localPath[i]] = value;
};

const parseOptionValue = value => ['True', 'False'].includes(value) ? JSON.parse(value.toLocaleLowerCase()) : value;

export const mapConfigValues = (config: IConfig, resource: ResourceType, optionsValuesMap: Map<OptionType, string>) => {
  const newConfig = JSON.parse(JSON.stringify(config));

  optionsValuesMap.forEach((val, key) => {
    const optionItem = optionsCommands.get(key);
    const optionValue = parseOptionValue(val);
    const resourceConfigPath = optionItem.configPath ? optionItem.configPath.replace('{resource}', resource.toLocaleLowerCase()) : '';

    setToValue(newConfig, optionValue, resourceConfigPath);
  });

  return newConfig;
};

export const showWarning = async (): Promise<any> => {
  vscode.window.showInformationMessage('Please install latest version of vscode', 'Got It');
};
