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
const vscode_1 = require("vscode");
const fs = require("fs");
const promisify_1 = require("./promisify");
const fsWriteFile = promisify_1.promisify(fs.writeFile);
const fsExists = promisify_1.promisify(fs.exists);
const fsMkdir = promisify_1.promisify(fs.mkdir);
// Get file contents and create the new files in the folder 
exports.createFiles = (loc, files) => __awaiter(this, void 0, void 0, function* () {
    try {
        yield writeFiles(files);
    }
    catch (ex) {
        yield vscode_1.window.showErrorMessage(`File(s) could not be created. ${ex}`);
    }
    return loc.dirPath;
});
exports.createFiles2 = (loc, files2) => __awaiter(this, void 0, void 0, function* () {
    try {
        yield writeFiles2(files2);
    }
    catch (ex) {
        yield vscode_1.window.showErrorMessage(`File(s) could not be created. ${ex}`);
    }
    return loc.dirPath2;
});
exports.createFiles3 = (loc, files3) => __awaiter(this, void 0, void 0, function* () {
    try {
        yield writeFiles3(files3);
    }
    catch (ex) {
        yield vscode_1.window.showErrorMessage(`File(s) could not be created. ${ex}`);
    }
    return loc.dirPath3;
});
exports.createFiles4 = (loc, files4) => __awaiter(this, void 0, void 0, function* () {
    try {
        yield writeFiles4(files4);
    }
    catch (ex) {
        yield vscode_1.window.showErrorMessage(`File(s) could not be created. ${ex}`);
    }
    return loc.dirPath4;
});
exports.createFiles5 = (loc, files5) => __awaiter(this, void 0, void 0, function* () {
    try {
        yield writeFiles5(files5);
    }
    catch (ex) {
        yield vscode_1.window.showErrorMessage(`File(s) could not be created. ${ex}`);
    }
    return loc.dirPath5;
});
exports.createFiles6 = (loc, files6) => __awaiter(this, void 0, void 0, function* () {
    try {
        yield writeFiles6(files6);
    }
    catch (ex) {
        yield vscode_1.window.showErrorMessage(`File(s) could not be created. ${ex}`);
    }
    return loc.dirPath6;
});
exports.createFiles7 = (loc, files7) => __awaiter(this, void 0, void 0, function* () {
    try {
        yield writeFiles7(files7);
    }
    catch (ex) {
        yield vscode_1.window.showErrorMessage(`File(s) could not be created. ${ex}`);
    }
    return loc.dirPath7;
});
exports.createSameFiles = (loc, sameFiles) => __awaiter(this, void 0, void 0, function* () {
    try {
        yield writeSameFiles(sameFiles);
    }
    catch (ex) {
        yield vscode_1.window.showErrorMessage(`File(s) could not be created. ${ex}`);
    }
    return loc.sameDirPath;
});
const writeFiles = (files) => __awaiter(this, void 0, void 0, function* () {
    const filesPromises = files.map(file => fsWriteFile(file.name, file.content));
    yield Promise.all(filesPromises);
});
const writeFiles2 = (files2) => __awaiter(this, void 0, void 0, function* () {
    const filesPromises2 = files2.map(file2 => fsWriteFile(file2.name, file2.content));
    yield Promise.all(filesPromises2);
});
const writeFiles3 = (files3) => __awaiter(this, void 0, void 0, function* () {
    const filesPromises3 = files3.map(file3 => fsWriteFile(file3.name, file3.content));
    yield Promise.all(filesPromises3);
});
const writeFiles4 = (files4) => __awaiter(this, void 0, void 0, function* () {
    const filesPromises4 = files4.map(file2 => fsWriteFile(file2.name, file2.content));
    yield Promise.all(filesPromises4);
});
const writeFiles5 = (files5) => __awaiter(this, void 0, void 0, function* () {
    const filesPromises2 = files5.map(file2 => fsWriteFile(file2.name, file2.content));
    yield Promise.all(filesPromises2);
});
const writeFiles6 = (files6) => __awaiter(this, void 0, void 0, function* () {
    const filesPromises2 = files6.map(file2 => fsWriteFile(file2.name, file2.content));
    yield Promise.all(filesPromises2);
});
const writeFiles7 = (files7) => __awaiter(this, void 0, void 0, function* () {
    const filesPromises2 = files7.map(file2 => fsWriteFile(file2.name, file2.content));
    yield Promise.all(filesPromises2);
});
const writeSameFiles = (sameFiles) => __awaiter(this, void 0, void 0, function* () {
    const filesPromises2 = sameFiles.map(file2 => fsWriteFile(file2.name, file2.content));
    yield Promise.all(filesPromises2);
});
// Create the new folder
exports.createFolder = (loc) => __awaiter(this, void 0, void 0, function* () {
    if (loc.dirName) {
        const exists = yield fsExists(loc.dirPath);
        if (exists) {
            throw new Error('Folder already exists');
        }
        yield fsMkdir(loc.dirPath);
    }
    return loc;
});
// Create another folder
exports.createFolder2 = (loc2) => __awaiter(this, void 0, void 0, function* () {
    if (loc2.dirName2) {
        const exists = yield fsExists(loc2.dirPath2);
        if (exists) {
            throw new Error('Folder already exists');
        }
        yield fsMkdir(loc2.dirPath2);
    }
    return loc2;
});
exports.createFolder3 = (loc3) => __awaiter(this, void 0, void 0, function* () {
    if (loc3.dirName3) {
        const exists = yield fsExists(loc3.dirPath3);
        if (exists) {
            throw new Error('Folder already exists');
        }
        yield fsMkdir(loc3.dirPath3);
    }
    return loc3;
});
exports.createFolder4 = (loc4) => __awaiter(this, void 0, void 0, function* () {
    if (loc4.dirName4) {
        const exists = yield fsExists(loc4.dirPath4);
        if (exists) {
            throw new Error('Folder already exists');
        }
        yield fsMkdir(loc4.dirPath4);
    }
    return loc4;
});
exports.createFolder5 = (loc5) => __awaiter(this, void 0, void 0, function* () {
    if (loc5.dirName5) {
        const exists = yield fsExists(loc5.dirPath5);
        if (exists) {
            throw new Error('Folder already exists');
        }
        yield fsMkdir(loc5.dirPath5);
    }
    return loc5;
});
exports.createFolder6 = (loc6) => __awaiter(this, void 0, void 0, function* () {
    if (loc6.dirName6) {
        const exists = yield fsExists(loc6.dirPath6);
        if (exists) {
            throw new Error('Folder already exists');
        }
        yield fsMkdir(loc6.dirPath6);
    }
    return loc6;
});
exports.createFolder7 = (loc7) => __awaiter(this, void 0, void 0, function* () {
    if (loc7.dirName7) {
        const exists = yield fsExists(loc7.dirPath7);
        if (exists) {
            throw new Error('Folder already exists');
        }
        yield fsMkdir(loc7.dirPath7);
    }
    return loc7;
});
//# sourceMappingURL=ioutil.js.map