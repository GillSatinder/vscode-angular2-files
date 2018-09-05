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

export const createFiles2 = async (loc: IPath, files2: IFiles[]) => {
  try {
    await writeFiles2(files2);
  } catch (ex) {
    await window.showErrorMessage(`File(s) could not be created. ${ex}`);
  }

  return loc.dirPath2;
};

export const createFiles3 = async (loc: IPath, files3: IFiles[]) => {
  try {
    await writeFiles3(files3);
  } catch (ex) {
    await window.showErrorMessage(`File(s) could not be created. ${ex}`);
  }

  return loc.dirPath3;
};

export const createFiles4 = async (loc: IPath, files4: IFiles[]) => {
  try {
    await writeFiles4(files4);
  } catch (ex) {
    await window.showErrorMessage(`File(s) could not be created. ${ex}`);
  }

  return loc.dirPath4;
};

export const createFiles5 = async (loc: IPath, files5: IFiles[]) => {
  try {
    await writeFiles5(files5);
  } catch (ex) {
    await window.showErrorMessage(`File(s) could not be created. ${ex}`);
  }

  return loc.dirPath5;
};

export const createFiles6 = async (loc: IPath, files6: IFiles[]) => {
  try {
    await writeFiles6(files6);
  } catch (ex) {
    await window.showErrorMessage(`File(s) could not be created. ${ex}`);
  }

  return loc.dirPath6;
};

export const createFiles7 = async (loc: IPath, files7: IFiles[]) => {
  try {
    await writeFiles7(files7);
  } catch (ex) {
    await window.showErrorMessage(`File(s) could not be created. ${ex}`);
  }

  return loc.dirPath7;
};

export const createSameFiles = async (loc: IPath, sameFiles: IFiles[]) => {
  try {
    await writeSameFiles(sameFiles);
  } catch (ex) {
    await window.showErrorMessage(`File(s) could not be created. ${ex}`);
  } return loc.sameDirPath;
};

const writeFiles = async (files: IFiles[]) => {
  const filesPromises: Promise<any>[] = files.map(file => fsWriteFile(file.name, file.content));

  await Promise.all(filesPromises);
};

const writeFiles2 = async (files2: IFiles[]) => {
  const filesPromises2: Promise<any>[] = files2.map(file2 => fsWriteFile(file2.name, file2.content));

  await Promise.all(filesPromises2);
};

const writeFiles3 = async (files3: IFiles[]) => {
  const filesPromises3: Promise<any>[] = files3.map(file3 => fsWriteFile(file3.name, file3.content));

  await Promise.all(filesPromises3);
};

const writeFiles4 = async (files4: IFiles[]) => {
  const filesPromises4: Promise<any>[] = files4.map(file2 => fsWriteFile(file2.name, file2.content));

  await Promise.all(filesPromises4);
};

const writeFiles5 = async (files5: IFiles[]) => {
  const filesPromises2: Promise<any>[] = files5.map(file2 => fsWriteFile(file2.name, file2.content));

  await Promise.all(filesPromises2);
};

const writeFiles6 = async (files6: IFiles[]) => {
  const filesPromises2: Promise<any>[] = files6.map(file2 => fsWriteFile(file2.name, file2.content));

  await Promise.all(filesPromises2);
};

const writeFiles7 = async (files7: IFiles[]) => {
  const filesPromises2: Promise<any>[] = files7.map(file2 => fsWriteFile(file2.name, file2.content));

  await Promise.all(filesPromises2);
};

const writeSameFiles = async (sameFiles: IFiles[]) => {
  const filesPromises2: Promise<any>[] = sameFiles.map(file2 => fsWriteFile(file2.name, file2.content));
  await Promise.all(filesPromises2);
};



// Create the new folder
export const createFolder = async (loc: IPath) => {
  
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

