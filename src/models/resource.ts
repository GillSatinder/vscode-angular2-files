import { IResourceFile } from './resource-file';
import { OptionType } from '../enums/option-type';


export interface IResource {
  locDirName?: Function;
  locDirName2?:Function;
  locDirName3?:Function;
  locDirName4?:Function;
  locDirName5?:Function;
  locDirName6?:Function;
  locDirName7?:Function;
  locDirPath?: Function;
  locDirPath2?: Function;
  locDirPath3?: Function;
  locDirPath4?: Function;
  locDirPath5?: Function;
  locDirPath6?:Function;
  locDirPath7?:Function;
  files: IResourceFile[];
  createFolder?: Function;
  createFolder2?: Function;
  createFolder3?: Function;
  createFolder4?: Function;
  createFolder5?: Function;
  createFolder6?: Function;
  createFolder7?: Function;
  declaration?: string;
  options?: OptionType[];
}
