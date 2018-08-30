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
export const createFolder2 = async (loc: IPath) => {
  
  if (loc.dirName2) {
    const exists: boolean = await fsExists(loc.dirPath2);
    if (exists) {
      throw new Error('Folder already exists');
    }

    await fsMkdir(loc.dirPath2);
  }

  return loc;
};

export const createFolder3 = async (loc: IPath) => {
 
  if (loc.dirName3) {
    const exists: boolean = await fsExists(loc.dirPath3);
    if (exists) {
      throw new Error('Folder already exists');
    }

    await fsMkdir(loc.dirPath3);
  }

  return loc;
};

export const createFolder4 = async (loc: IPath) => {
 
  if (loc.dirName4) {
    const exists: boolean = await fsExists(loc.dirPath4);
    if (exists) {
      throw new Error('Folder already exists');
    }

    await fsMkdir(loc.dirPath4);
  }

  return loc;
};

export const createFolder5 = async (loc: IPath) => {
 
  if (loc.dirName5) {
    const exists: boolean = await fsExists(loc.dirPath5);
    if (exists) {
      throw new Error('Folder already exists');
    }

    await fsMkdir(loc.dirPath5);
  }

  return loc;
};

export const createFolder6 = async (loc: IPath) => {
 
  if (loc.dirName6) {
    const exists: boolean = await fsExists(loc.dirPath6);
    if (exists) {
      throw new Error('Folder already exists');
    }

    await fsMkdir(loc.dirPath6);
  }

  return loc;
};

export const createFolder7 = async (loc: IPath) => {
 
  if (loc.dirName7) {
    const exists: boolean = await fsExists(loc.dirPath7);
    if (exists) {
      throw new Error('Folder already exists');
    }

    await fsMkdir(loc.dirPath7);
  }

  return loc;
};

