import { window, workspace, TextEditor, commands, Uri, WorkspaceEdit } from 'vscode';
import * as fs from 'fs';
import { IPath } from './models/path';
import { IFiles } from './models/file';
import { promisify } from './promisify';

const fsWriteFile = promisify(fs.writeFile);
const fsExists = promisify(fs.exists);
const fsMkdir = promisify(fs.mkdir);

// Get file contents and create the new files in the folder 
export const createFiles = async (loc: IPath, files: IFiles[]) => {
  try {
    await writeFiles(files);
  } catch (ex) {
    await window.showErrorMessage(`File(s) could not be created. ${ex}`);
  }

  return loc.dirPath;
};

const writeFiles = async (files: IFiles[]) => {
  const filesPromises: Promise<any>[] = files.map(file => fsWriteFile(file.name, file.content));

  await Promise.all(filesPromises);
};




// Create the new folder
export const createFolder = async (loc: IPath) => {
  console.log('this is from folder 1');
  console.log(loc);
  if (loc.dirName) {
    const exists: boolean = await fsExists(loc.dirPath);
    if (exists) {
      throw new Error('Folder already exists');
    }

    await fsMkdir(loc.dirPath);
  }

  return loc;
};

// Create another folder
export const createFolder2 = async (loc2: IPath) => {
  
  if (loc2.dirName2) {
    const exists: boolean = await fsExists(loc2.dirPath2);
    if (exists) {
      throw new Error('Folder already exists');
    }

    await fsMkdir(loc2.dirPath2);
  }

  return loc2;
};

export const createFolder3 = async (loc3: IPath) => {
 
  if (loc3.dirName3) {
    const exists: boolean = await fsExists(loc3.dirPath3);
    if (exists) {
      throw new Error('Folder already exists');
    }

    await fsMkdir(loc3.dirPath3);
  }

  return loc3;
};

export const createFolder4 = async (loc4: IPath) => {
 
  if (loc4.dirName4) {
    const exists: boolean = await fsExists(loc4.dirPath4);
    if (exists) {
      throw new Error('Folder already exists');
    }

    await fsMkdir(loc4.dirPath4);
  }

  return loc4;
};

export const createFolder5 = async (loc5: IPath) => {
 
  if (loc5.dirName5) {
    const exists: boolean = await fsExists(loc5.dirPath5);
    if (exists) {
      throw new Error('Folder already exists');
    }

    await fsMkdir(loc5.dirPath5);
  }

  return loc5;
};

export const createFolder6 = async (loc6: IPath) => {
 
  if (loc6.dirName6) {
    const exists: boolean = await fsExists(loc6.dirPath6);
    if (exists) {
      throw new Error('Folder already exists');
    }

    await fsMkdir(loc6.dirPath6);
  }

  return loc6;
};

export const createFolder7 = async (loc7: IPath) => {
 
  if (loc7.dirName7) {
    const exists: boolean = await fsExists(loc7.dirPath7);
    if (exists) {
      throw new Error('Folder already exists');
    }

    await fsMkdir(loc7.dirPath7);
  }

  return loc7;
};

