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
const rimraf = require("rimraf");
const chai = require("chai");
const sinonChai = require("sinon-chai");
const path = require("path");
const angular_cli_1 = require("./../src/angular-cli");
const cli_config_1 = require("./../src/config/cli-config");
const resources_1 = require("./../src/resources");
const resource_type_1 = require("./../src/enums/resource-type");
chai.use(sinonChai);
const expect = chai.expect;
let config = JSON.parse(JSON.stringify(cli_config_1.config));
const testPath = path.join(__dirname, 'app');
const angularCli = new angular_cli_1.AngularCli();
describe('Extension Tests:', () => {
    before(() => {
        if (!fs.existsSync(testPath)) {
            fs.mkdirSync(testPath);
        }
    });
    beforeEach(() => {
        config = JSON.parse(JSON.stringify(cli_config_1.config));
    });
    afterEach(() => {
        rimraf.sync(`${testPath}/**/*`);
    });
    after(() => {
        if (fs.existsSync(testPath)) {
            rimraf.sync(testPath);
        }
    });
    describe('Generate component tests', () => {
        const resource = resources_1.resources.get(resource_type_1.ResourceType.Component);
        const resourceNames = resource.files.map(r => r.name(config));
        const myPath = {
            fullPath: path.join(testPath, 'my-component'),
            fileName: 'my-component',
            dirName: '',
            dirPath: testPath,
            rootPath: __dirname,
            params: [],
        };
        afterEach(() => {
            if (fs.existsSync(myPath.fullPath)) {
                rimraf.sync(myPath.fullPath);
            }
        });
        it('Should generate component default', () => __awaiter(this, void 0, void 0, function* () {
            const checkForSome = arr => string => arr.some(bit => string.endsWith(bit));
            const location = Object.assign({}, myPath);
            const result = yield angularCli.generateResources(resource_type_1.ResourceType.Component, location, config);
            const files = fs.readdirSync(myPath.fullPath);
            expect(files).to.have.length(resource.files.length, `Incorect number of ${resource_type_1.ResourceType.Component} files has been generated`);
            files.forEach((file) => {
                expect(file).to.satisfy(checkForSome(resourceNames), `Unknown ${file} was generated`);
            });
        }));
        it('Should generate component without spec', () => __awaiter(this, void 0, void 0, function* () {
            config.defaults.component.spec = false;
            const location = Object.assign({}, myPath);
            const result = yield angularCli.generateResources(resource_type_1.ResourceType.Component, location, config);
            const files = fs.readdirSync(myPath.fullPath);
            expect(files).to.have.length(resource.files.length - 1, `Incorect number of ${resource_type_1.ResourceType.Component} files has been generated`);
        }));
        it('Should generate component without style', () => __awaiter(this, void 0, void 0, function* () {
            config.defaults.component.inlineStyle = true;
            const location = Object.assign({}, myPath);
            const checkNoStyleFile = arr => arr.every(item => !item.endsWith(`.${config.defaults.styleExt}`));
            const result = yield angularCli.generateResources(resource_type_1.ResourceType.Component, location, config);
            const files = fs.readdirSync(myPath.fullPath);
            expect(files).to.satisfy(checkNoStyleFile, `Style file should not be created`);
        }));
        it('Should generate component without template', () => __awaiter(this, void 0, void 0, function* () {
            config.defaults.component.inlineTemplate = true;
            const location = Object.assign({}, myPath);
            const checkNoTemlateFile = arr => arr.every(item => !item.endsWith('.html'));
            const result = yield angularCli.generateResources(resource_type_1.ResourceType.Component, location, config);
            const files = fs.readdirSync(myPath.fullPath);
            expect(files).to.satisfy(checkNoTemlateFile, `Template file should not be created`);
        }));
        it('Should generate flat component', () => __awaiter(this, void 0, void 0, function* () {
            config.defaults.component.flat = true;
            const location = Object.assign({}, myPath);
            const result = yield angularCli.generateResources(resource_type_1.ResourceType.Component, location, config);
            const files = fs.readdirSync(myPath.dirPath);
            expect(files).to.have.length(resource.files.length, `Incorect number of ${resource_type_1.ResourceType.Component} files has been generated`);
            files.forEach((file) => {
                const filePath = path.join(myPath.dirPath, file);
                fs.unlinkSync(filePath);
            });
        }));
        it('Should generate component with OnPush change detection', () => __awaiter(this, void 0, void 0, function* () {
            config.defaults.component.changeDetection = 'OnPush';
            const location = Object.assign({}, myPath);
            const result = yield angularCli.generateResources(resource_type_1.ResourceType.Component, location, config);
            const files = fs.readdirSync(myPath.fullPath);
            const componentFileName = files.find(f => f.endsWith('component.ts'));
            const fileContent = fs.readFileSync(path.join(location.fullPath, componentFileName), 'utf-8');
            expect(fileContent).to.contain(config.defaults.component.changeDetection, ' Invalid change detection stratefy generated');
        }));
        it('Should generate component with None viewEncapsulation', () => __awaiter(this, void 0, void 0, function* () {
            config.defaults.component.viewEncapsulation = 'None';
            const location = Object.assign({}, myPath);
            const result = yield angularCli.generateResources(resource_type_1.ResourceType.Component, location, config);
            const files = fs.readdirSync(myPath.fullPath);
            const componentFileName = files.find(f => f.endsWith('component.ts'));
            const fileContent = fs.readFileSync(path.join(location.fullPath, componentFileName), 'utf-8');
            expect(fileContent).to.contain(`encapsulation: ViewEncapsulation.${config.defaults.component.viewEncapsulation}`, ' Invalid change detection stratefy generated');
        }));
        it('Should generate component with module declaration', () => __awaiter(this, void 0, void 0, function* () {
            const moduleLocation = Object.assign({}, { fullPath: path.join(testPath, 'my-module'), fileName: 'my-module', dirName: '', dirPath: testPath, rootPath: __dirname, params: [] });
            config.defaults.component.module = 'my-module';
            const componentLocation = Object.assign({}, moduleLocation, { fullPath: path.join(testPath, 'my-module', 'my-component'), fileName: 'my-component', dirPath: path.join(testPath, 'my-module') });
            yield angularCli.generateResources(resource_type_1.ResourceType.Module, moduleLocation, config);
            const result = yield angularCli.generateResources(resource_type_1.ResourceType.Component, componentLocation, config);
            const moduleFilename = fs.readdirSync(moduleLocation.fullPath).find(f => f.endsWith('module.ts'));
            expect(moduleFilename).not.to.be.empty;
            const moduleFileContent = fs.readFileSync(path.join(moduleLocation.fullPath, moduleFilename), 'utf-8');
            expect(moduleFileContent).to.contain('MyComponentComponent', 'No declaration has been added');
        }));
    });
    describe('Generate class tests', () => {
        const resource = resources_1.resources.get(resource_type_1.ResourceType.Class);
        const myPath = {
            fullPath: path.join(testPath, 'my-class'),
            fileName: 'my-class',
            dirName: '',
            dirPath: testPath,
            rootPath: __dirname,
            params: [],
        };
        it('Should generate class default', () => __awaiter(this, void 0, void 0, function* () {
            const location = Object.assign({}, myPath);
            const result = yield angularCli.generateResources(resource_type_1.ResourceType.Class, location, config);
            const files = fs.readdirSync(myPath.dirPath).filter(f => f.endsWith(`${myPath.fileName}.ts`));
            expect(files).to.have.length(1, `Incorect number of ${resource_type_1.ResourceType.Class} files has been generated`);
        }));
        it('Should generate class with spec', () => __awaiter(this, void 0, void 0, function* () {
            config.defaults.class.spec = true;
            const location = Object.assign({}, myPath);
            const result = yield angularCli.generateResources(resource_type_1.ResourceType.Class, location, config);
            const files = fs.readdirSync(myPath.dirPath).filter(f => f.includes(`${myPath.fileName}.`));
            expect(files).to.have.length(2, `Incorect number of ${resource_type_1.ResourceType.Class} files has been generated`);
        }));
    });
    describe('Generate directive tests', () => {
        const resource = resources_1.resources.get(resource_type_1.ResourceType.Directive);
        const myPath = {
            fullPath: path.join(testPath, 'my-directive'),
            fileName: 'my-directive',
            dirName: '',
            dirPath: testPath,
            rootPath: __dirname,
            params: [],
        };
        it('Should generate directive default', () => __awaiter(this, void 0, void 0, function* () {
            const location = Object.assign({}, myPath);
            const result = yield angularCli.generateResources(resource_type_1.ResourceType.Directive, location, config);
            const files = fs.readdirSync(myPath.dirPath).filter(f => f.includes(`${myPath.fileName}.${resource_type_1.ResourceType.Directive}`));
            expect(files).to.have.length(2, `Incorect number of ${resource_type_1.ResourceType.Directive} files has been generated`);
        }));
        it('Should generate directive non flat', () => __awaiter(this, void 0, void 0, function* () {
            config.defaults.directive.flat = false;
            const location = Object.assign({}, myPath);
            const result = yield angularCli.generateResources(resource_type_1.ResourceType.Directive, location, config);
            const files = fs.readdirSync(myPath.fullPath).filter(f => f.includes(`${myPath.fileName}.${resource_type_1.ResourceType.Directive}`));
            expect(files).to.have.length(2, `Incorect number of ${resource_type_1.ResourceType.Directive} files has been generated`);
        }));
        it('Should generate directive without spec', () => __awaiter(this, void 0, void 0, function* () {
            config.defaults.directive.flat = false;
            config.defaults.directive.spec = false;
            const location = Object.assign({}, myPath);
            const result = yield angularCli.generateResources(resource_type_1.ResourceType.Directive, location, config);
            const files = fs.readdirSync(myPath.fullPath).filter(f => f.includes(`${myPath.fileName}.${resource_type_1.ResourceType.Directive}`));
            expect(files).to.have.length(1, `Incorect number of ${resource_type_1.ResourceType.Directive} files has been generated`);
        }));
    });
    describe.skip('Generate guard tests', () => {
        const resource = resources_1.resources.get(resource_type_1.ResourceType.Guard);
        const myPath = {
            fullPath: path.join(testPath, 'my-guard'),
            fileName: 'my-guard',
            dirName: '',
            dirPath: testPath,
            rootPath: __dirname,
            params: [],
        };
        it('Should generate guard default', () => __awaiter(this, void 0, void 0, function* () {
            const location = Object.assign({}, myPath);
            const result = yield angularCli.generateResources(resource_type_1.ResourceType.Guard, location, config);
            const files = fs.readdirSync(myPath.dirPath).filter(f => f.includes(`${myPath.fileName}.${resource_type_1.ResourceType.Guard}`));
            expect(files).to.have.length(2, `Incorect number of ${resource_type_1.ResourceType.Guard} files has been generated`);
        }));
    });
    describe('Generate interface tests', () => {
        const resource = resources_1.resources.get(resource_type_1.ResourceType.Interface);
        const myPath = {
            fullPath: path.join(testPath, 'my-interface'),
            fileName: 'my-interface',
            dirName: '',
            dirPath: testPath,
            rootPath: __dirname,
            params: [],
        };
        it('Should generate interface default', () => __awaiter(this, void 0, void 0, function* () {
            const location = Object.assign({}, myPath);
            const result = yield angularCli.generateResources(resource_type_1.ResourceType.Interface, location, config);
            const files = fs.readdirSync(myPath.dirPath).filter(f => f.includes(`${myPath.fileName}.`));
            expect(files).to.have.length(1, `Incorect number of ${resource_type_1.ResourceType.Interface} files has been generated`);
        }));
        it('Should generate interface with prefix', () => __awaiter(this, void 0, void 0, function* () {
            config.defaults.interface.prefix = 'I';
            const location = Object.assign({}, myPath);
            const result = yield angularCli.generateResources(resource_type_1.ResourceType.Interface, location, config);
            const interfaceFileName = fs.readdirSync(myPath.dirPath).find(f => f.includes(`${myPath.fileName}.`));
            const fileContent = fs.readFileSync(path.join(location.dirPath, interfaceFileName), 'utf-8');
            expect(fileContent).to.include('interface IMyInterface', `Incorect ${resource_type_1.ResourceType.Interface} name has been generated`);
        }));
    });
    describe('Generate module tests', () => {
        const resource = resources_1.resources.get(resource_type_1.ResourceType.Module);
        const resourceNames = resource.files.map(r => r.name(config));
        const myPath = {
            fullPath: path.join(testPath, 'my-module'),
            fileName: 'my-module',
            dirName: '',
            dirPath: testPath,
            rootPath: __dirname,
            params: [],
        };
        it('Should generate module default', () => __awaiter(this, void 0, void 0, function* () {
            const checkForSome = arr => string => arr.some(bit => string.endsWith(bit));
            const location = Object.assign({}, myPath);
            const result = yield angularCli.generateResources(resource_type_1.ResourceType.Module, location, config);
            const files = fs.readdirSync(myPath.fullPath);
            expect(files).to.have.length(4, `Incorect number of ${resource_type_1.ResourceType.Module} files has been generated`);
        }));
        it('Should generate module with spec', () => __awaiter(this, void 0, void 0, function* () {
            config.defaults.module.spec = true;
            const checkForSome = arr => string => arr.some(bit => string.endsWith(bit));
            const location = Object.assign({}, myPath);
            const result = yield angularCli.generateResources(resource_type_1.ResourceType.Module, location, config);
            const files = fs.readdirSync(myPath.fullPath);
            expect(files).to.have.length(5, `Incorect number of ${resource_type_1.ResourceType.Module} files has been generated`);
        }));
        it('Should generate module flat', () => __awaiter(this, void 0, void 0, function* () {
            config.defaults.module.flat = true;
            const checkForSome = arr => string => arr.some(bit => string.endsWith(bit));
            const location = Object.assign({}, myPath);
            const result = yield angularCli.generateResources(resource_type_1.ResourceType.Module, location, config);
            const files = fs.readdirSync(myPath.dirPath).filter(f => f.includes(`${myPath.fileName}.`));
            expect(files).to.have.length(4, `Incorect number of ${resource_type_1.ResourceType.Module} files has been generated`);
        }));
    });
    describe('Generate pipe tests', () => {
        const resource = resources_1.resources.get(resource_type_1.ResourceType.Pipe);
        const myPath = {
            fullPath: path.join(testPath, 'my-pipe'),
            fileName: 'my-pipe',
            dirName: '',
            dirPath: testPath,
            rootPath: __dirname,
            params: [],
        };
        it('Should generate pipe default', () => __awaiter(this, void 0, void 0, function* () {
            const location = Object.assign({}, myPath);
            const result = yield angularCli.generateResources(resource_type_1.ResourceType.Pipe, location, config);
            const files = fs.readdirSync(myPath.dirPath).filter(f => f.includes(`${myPath.fileName}.${resource_type_1.ResourceType.Pipe}`));
            expect(files).to.have.length(2, `Incorect number of ${resource_type_1.ResourceType.Pipe} files has been generated`);
        }));
        it('Should generate pipe non flat', () => __awaiter(this, void 0, void 0, function* () {
            config.defaults.pipe.flat = false;
            const location = Object.assign({}, myPath);
            const result = yield angularCli.generateResources(resource_type_1.ResourceType.Pipe, location, config);
            const files = fs.readdirSync(myPath.fullPath).filter(f => f.includes(`${myPath.fileName}.${resource_type_1.ResourceType.Pipe}`));
            expect(files).to.have.length(2, `Incorect number of ${resource_type_1.ResourceType.Pipe} files has been generated`);
        }));
        it('Should generate pipe without spec', () => __awaiter(this, void 0, void 0, function* () {
            config.defaults.pipe.flat = false;
            config.defaults.pipe.spec = false;
            const location = Object.assign({}, myPath);
            const result = yield angularCli.generateResources(resource_type_1.ResourceType.Pipe, location, config);
            const files = fs.readdirSync(myPath.fullPath).filter(f => f.includes(`${myPath.fileName}.${resource_type_1.ResourceType.Pipe}`));
            expect(files).to.have.length(1, `Incorect number of ${resource_type_1.ResourceType.Pipe} files has been generated`);
        }));
    });
    describe('Generate service tests', () => {
        const resource = resources_1.resources.get(resource_type_1.ResourceType.Service);
        const myPath = {
            fullPath: path.join(testPath, 'my-service'),
            fileName: 'my-service',
            dirName: '',
            dirPath: testPath,
            rootPath: __dirname,
            params: [],
        };
        it('Should generate service default', () => __awaiter(this, void 0, void 0, function* () {
            const location = Object.assign({}, myPath);
            const result = yield angularCli.generateResources(resource_type_1.ResourceType.Service, location, config);
            const files = fs.readdirSync(myPath.dirPath).filter(f => f.includes(`${myPath.fileName}.${resource_type_1.ResourceType.Service}`));
            expect(files).to.have.length(2, `Incorect number of ${resource_type_1.ResourceType.Service} files has been generated`);
        }));
        it('Should generate service non flat', () => __awaiter(this, void 0, void 0, function* () {
            config.defaults.service.flat = false;
            const location = Object.assign({}, myPath);
            const result = yield angularCli.generateResources(resource_type_1.ResourceType.Service, location, config);
            const files = fs.readdirSync(myPath.fullPath).filter(f => f.includes(`${myPath.fileName}.${resource_type_1.ResourceType.Service}`));
            expect(files).to.have.length(2, `Incorect number of ${resource_type_1.ResourceType.Service} files has been generated`);
        }));
        it('Should generate service without spec', () => __awaiter(this, void 0, void 0, function* () {
            config.defaults.service.flat = false;
            config.defaults.service.spec = false;
            const location = Object.assign({}, myPath);
            const result = yield angularCli.generateResources(resource_type_1.ResourceType.Service, location, config);
            const files = fs.readdirSync(myPath.fullPath).filter(f => f.includes(`${myPath.fileName}.${resource_type_1.ResourceType.Service}`));
            expect(files).to.have.length(1, `Incorect number of ${resource_type_1.ResourceType.Service} files has been generated`);
        }));
    });
    it('Should contain only lowercase imports', () => __awaiter(this, void 0, void 0, function* () {
        const srcpath = path.resolve(__dirname, '..', 'src');
        const regex = /\(\s*([^)]+?)\s*\)/;
        const getAllFiles = dir => fs.readdirSync(dir).reduce((files, file) => {
            const name = path.join(dir, file);
            const isDirectory = fs.statSync(name).isDirectory();
            return isDirectory ? [...files, ...getAllFiles(name)] : [...files, name];
        }, []);
        const files = getAllFiles(srcpath).filter(f => f.endsWith('.js'));
        files.forEach((file) => {
            const fileContent = fs.readFileSync(file, 'utf-8');
            const lines = fileContent.split('\r\n').filter(f => f.includes('require('));
            const requireLines = lines.map(line => regex.exec(line)[1]);
            requireLines.forEach((line) => {
                expect(line).to.be.eql(line.toLocaleLowerCase());
            });
        });
    }));
    it('Should contain templates', () => __awaiter(this, void 0, void 0, function* () {
        const srcPath = path.resolve(__dirname, '..', 'src', 'templates');
        expect(fs.existsSync(srcPath), `Templates folder doesn't exists`);
        const files = fs.readdirSync(srcPath).filter(f => f.endsWith('.tmpl'));
        expect(files).not.to.be.empty;
    }));
});
//# sourceMappingURL=extension.test.js.map