"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const file_contents_1 = require("./file-contents");
const promisify_1 = require("./promisify");
const formatting_1 = require("./formatting");
const ioutil_1 = require("./ioutil");
const resources_1 = require("./resources");
const fsWriteFile = promisify_1.promisify(fs.writeFile);
const fsReaddir = promisify_1.promisify(fs.readdir);
const fsStat = promisify_1.promisify(fs.stat);
const fsReadFile = promisify_1.promisify(fs.readFile);
class AngularCli {
    constructor(fc = new file_contents_1.FileContents()) {
        this.fc = fc;
        fc.loadTemplates();
    }
    findModulePathRecursive(dir, fileList, optionalFilterFunction) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!fileList) {
                console.error('Variable \'fileList\' is undefined or NULL.');
                return;
            }
            const files = yield fsReaddir(dir);
            for (const i in files) {
                if (!files.hasOwnProperty(i)) {
                    continue;
                }
                const name = path.join(dir, files[i]);
                const stat = yield fsStat(name);
                if (stat.isDirectory()) {
                    yield this.findModulePathRecursive(name, fileList, optionalFilterFunction);
                }
                else {
                    if (optionalFilterFunction && optionalFilterFunction(name) !== true) {
                        continue;
                    }
                    fileList.push(name);
                }
            }
        });
    }
    addToImport(data, fileName, type, relativePath) {
        const typeUpper = formatting_1.toUpperCase(type);
        const fileNameUpper = formatting_1.toUpperCase(fileName);
        const lastImportInx = data.lastIndexOf('import ');
        const endOfLastImportInx = data.indexOf('\n', lastImportInx);
        const fileLength = data.length;
        return data.substring(0, endOfLastImportInx) + `\nimport { ${fileNameUpper}${typeUpper} } from '${relativePath}/${fileName}.${type}';` + data.substring(endOfLastImportInx, fileLength);
    }
    parseNgModule(data) {
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
            return [key.trim(), values];
        });
        const ngModuleMap = new Map(ngModuleTokenPairs);
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
    addToArray(ngModule, fileName, type, prop) {
        const item = `${formatting_1.toUpperCase(fileName)}${formatting_1.toUpperCase(type)}`;
        if (ngModule.ngModuleMap.has(prop)) {
            const items = ngModule.ngModuleMap.get(prop);
            items.push(item);
        }
        else {
            ngModule.ngModuleMap.set(prop, [item]);
        }
    }
    getRelativePath(dst, src) {
        const modulePath = path.parse(dst).dir;
        return '.' + src.replace(modulePath, '').replace(/\\/g, '/');
    }
    addDeclarationsToModule(loc, type, module, exports = false) {
        return __awaiter(this, void 0, void 0, function* () {
            const condition = (name) => module ? name.includes(`${module}.module.ts`) : name.includes('.module.ts');
            const moduleFiles = [];
            yield this.findModulePathRecursive(loc.rootPath, moduleFiles, condition);
            // at least one module is there
            if (moduleFiles.length > 0) {
                moduleFiles.sort((a, b) => path.dirname(a).length - path.dirname(b).length);
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
                const data = yield fsReadFile(module, 'utf8');
                // relativePath
                const relativePath = this.getRelativePath(module, loc.dirPath);
                const content = this.addToImport(data, loc.fileName, type, relativePath);
                const ngModule = this.parseNgModule(content);
                this.addToArray(ngModule, loc.fileName, type, 'declarations');
                if (exports) {
                    this.addToArray(ngModule, loc.fileName, type, 'exports');
                }
                yield fsWriteFile(module, ngModule.toString());
            }
        });
    }
    generateResources(name, loc, config) {
        return __awaiter(this, void 0, void 0, function* () {
            const resource = resources_1.resources.get(name);
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
                yield this.addDeclarationsToModule(loc, resource.declaration, config.defaults[name].module, config.defaults[name].export);
            }
            const files = resource.files.filter(file => (file.condition) ? file.condition(config, loc.params) : true).map((file) => {
                const fileName = file.name(config);
                return {
                    name: path.join(loc.dirPath, fileName.startsWith('-') ? `${loc.fileName}${fileName}` : `${loc.fileName}.${fileName}`),
                    content: this.fc.getTemplateContent(file.type, config, loc.fileName, loc.params),
                };
            });
            // for models
            const files2 = resource.files2.filter(file2 => (file2.condition) ? file2.condition(config, loc.params) : true).map((file2) => {
                const fileName2 = file2.name(config);
                return {
                    name: path.join(loc.dirPath2, `${loc.fileName}.${fileName2}`),
                    content: this.fc.getTemplateContent(file2.type, config, loc.fileName2, loc.params),
                };
            });
            //   for models 
            const sameFiles = resource.files2.filter(file2 => (file2.condition) ? file2.condition(config, loc.params) : true).map((file2) => {
                const fileName2 = file2.name(config);
                return {
                    name: path.join(loc.dirPath2, `${loc.fileName}.${fileName2}`),
                    content: this.fc.getTemplateContent(file2.type, config, loc.fileName2, loc.params),
                };
            });
            // for store
            const files3 = resource.files3.filter(file3 => (file3.condition) ? file3.condition(config, loc.params) : true).map((file3) => {
                const fileName3 = file3.name(config);
                const test = {
                    name: path.join(loc.dirPath3, `${loc.fileName}.${fileName3}`),
                    content: this.fc.getTemplateContent(file3.type, config, loc.fileName, loc.params),
                };
                return test;
            });
            const storeFiles = resource.files3.filter(file3 => (file3.condition) ? file3.condition(config, loc.params) : true).map((file3) => {
                const fileName3 = file3.name(config);
                return {
                    name: path.join(loc.dirPath3, fileName3.startsWith('-') ? `${loc.fileName3}${fileName3}` : `${loc.fileName3}.${fileName3}`),
                    content: this.fc.getTemplateContent(file3.type, config, loc.fileName3, loc.params),
                };
            });
            // -----------store files------------
            const files4 = resource.files4.filter(file4 => (file4.condition) ? file4.condition(config, loc.params) : true).map((file4) => {
                const fileName4 = file4.name(config);
                return {
                    name: path.join(loc.dirPath4, fileName4.startsWith('-') ? `${loc.fileName4}${fileName4}` : `${loc.fileName4}.${fileName4}`),
                    content: this.fc.getTemplateContent(file4.type, config, loc.fileName4, loc.params),
                };
            });
            const files5 = resource.files5.filter(file5 => (file5.condition) ? file5.condition(config, loc.params) : true).map((file5) => {
                const fileName5 = file5.name(config);
                console.log('this is the config', config);
                console.log('this is the loc.params', loc.params);
                return {
                    name: path.join(loc.dirPath5, fileName5.startsWith('-') ? `${loc.fileName5}${fileName5}` : `${loc.fileName5}.${fileName5}`),
                    content: this.fc.getTemplateContent(file5.type, config, loc.fileName5, loc.params),
                };
            });
            const files6 = resource.files6.filter(file6 => (file6.condition) ? file6.condition(config, loc.params) : true).map((file6) => {
                const fileName6 = file6.name(config);
                return {
                    name: path.join(loc.dirPath6, fileName6.startsWith('-') ? `${loc.fileName6}${fileName6}` : `${loc.fileName6}.${fileName6}`),
                    content: this.fc.getTemplateContent(file6.type, config, loc.fileName6, loc.params),
                };
            });
            const files7 = resource.files7.filter(file7 => (file7.condition) ? file7.condition(config, loc.params) : true).map((file7) => {
                const fileName7 = file7.name(config);
                return {
                    name: path.join(loc.dirPath7, fileName7.startsWith('-') ? `${loc.fileName7}${fileName7}` : `${loc.fileName7}.${fileName7}`),
                    content: this.fc.getTemplateContent(file7.type, config, loc.fileName7, loc.params),
                };
            });
            if (resource.hasOwnProperty('createFolder') && resource.createFolder(config)) {
                yield ioutil_1.createFolder(loc);
                yield ioutil_1.createFolder2(loc);
                yield ioutil_1.createFolder3(loc);
                yield ioutil_1.createFolder4(loc);
                yield ioutil_1.createFolder5(loc);
                yield ioutil_1.createFolder6(loc);
                yield ioutil_1.createFolder7(loc);
            }
            yield ioutil_1.createFiles(loc, files);
            yield ioutil_1.createFiles2(loc, files2);
            yield ioutil_1.createFiles3(loc, files3);
            yield ioutil_1.createFiles4(loc, files4);
            yield ioutil_1.createFiles5(loc, files5);
            yield ioutil_1.createFiles6(loc, files6);
            yield ioutil_1.createFiles7(loc, files7);
            yield ioutil_1.createSameFiles(loc, sameFiles);
        });
    }
}
exports.AngularCli = AngularCli;
//# sourceMappingURL=angular-cli.js.map