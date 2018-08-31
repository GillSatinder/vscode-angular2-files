"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai = require("chai");
const sinonChai = require("sinon-chai");
const file_contents_1 = require("./../src/file-contents");
const template_type_1 = require("./../src/enums/template-type");
const cli_config_1 = require("./../src/config/cli-config");
chai.use(sinonChai);
const expect = chai.expect;
let config = JSON.parse(JSON.stringify(cli_config_1.config));
describe('File content tests', () => {
    const fc = new file_contents_1.FileContents();
    fc.loadTemplates();
    beforeEach(() => {
        config = JSON.parse(JSON.stringify(cli_config_1.config));
    });
    describe('Class tests', () => {
        it('Should create a valid class', () => {
            const content = fc.getTemplateContent(template_type_1.TemplateType.Class, config, 'angular-files');
            expect(content).to.contain('export class', 'Should export class').throw;
            expect(content).to.contain('AngularFiles', 'Should have a valid class name').throw;
            expect(content.split(/\r?\n/).pop()).to.be.eql('', 'Should end with a newline').throw;
        });
        it('Should create a valid class spec', () => {
            const content = fc.getTemplateContent(template_type_1.TemplateType.ClassSpec, config, 'angular-files');
            expect(content).to.contain(`import {AngularFiles} from './angular-files'`, 'Should have a valid import in spec').throw;
            expect(content).to.contain(`describe('AngularFiles'`, 'Should have a valid describe in spec').throw;
            expect(content).to.contain(`expect(new AngularFiles())`, 'Should have a valid expect in spec').throw;
            expect(content.split(/\r?\n/).pop()).to.be.eql('', 'Should end with a newline').throw;
        });
    });
    describe('Enum tests', () => {
        it('Should create a valid enum', () => {
            const content = fc.getTemplateContent(template_type_1.TemplateType.Enum, config, 'angular-files');
            expect(content).to.contain('export enum', 'Should export enum').throw;
            expect(content).to.contain('AngularFiles', 'Should have a valid enum name').throw;
            expect(content.split(/\r?\n/).pop()).to.be.eql('', 'Should end with a newline').throw;
        });
    });
    describe('Interface tests', () => {
        it('Should create a valid interface', () => {
            const content = fc.getTemplateContent(template_type_1.TemplateType.Inteface, config, 'angular-files');
            expect(content).to.contain('export interface', 'Should export enum').throw;
            expect(content).to.contain('AngularFiles', 'Should have a valid interface  name').throw;
            expect(content.split(/\r?\n/).pop()).to.be.eql('', 'Should end with a newline').throw;
        });
        it('Should create a valid interface with prefix', () => {
            config.defaults.interface.prefix = 'I';
            const content = fc.getTemplateContent(template_type_1.TemplateType.Inteface, config, 'angular-files');
            expect(content).to.contain(`${config.defaults.interface.prefix}AngularFiles`, 'Should have a valid interface  name').throw;
        });
    });
    describe('Route tests', () => {
        it('Should create a valid route', () => {
            const content = fc.getTemplateContent(template_type_1.TemplateType.Route, config, 'angular-files');
            expect(content).to.contain('export const AngularFilesRoutes', 'Should export route').throw;
            expect(content).to.contain(`import { Routes, RouterModule } from '@angular/router'`, 'Should have valid routes imports').throw;
            expect(content).to.contain('const routes: Routes', 'Should declare routes').throw;
            expect(content.split(/\r?\n/).pop()).to.be.eql('', 'Should end with a newline').throw;
        });
    });
    describe('Service tests', () => {
        it('Should create a valid service', () => {
            const content = fc.getTemplateContent(template_type_1.TemplateType.Service, config, 'angular-files');
            expect(content).to.contain('@Injectable()', 'Should be injectable service').throw;
            expect(content).to.contain('export class', 'Should export service').throw;
            expect(content).to.contain('AngularFilesService', 'Should have a valid service name').throw;
            expect(content.split(/\r?\n/).pop()).to.be.eql('', 'Should end with a newline').throw;
        });
        it('Should create a valid service spec', () => {
            const content = fc.getTemplateContent(template_type_1.TemplateType.ServiceSpec, config, 'angular-files');
            expect(content).to.contain(`import { AngularFilesService } from './angular-files.service'`, 'Should have a valid import in spec').throw;
            expect(content).to.contain(`describe('Service: AngularFiles'`, 'Should have a valid describe in spec').throw;
            expect(content).to.contain(`expect(service)`, 'Should have a valid expect in spec').throw;
            expect(content.split(/\r?\n/).pop()).to.be.eql('', 'Should end with a newline').throw;
        });
    });
    describe('Pipe tests', () => {
        it('Should create a valid pipe', () => {
            const content = fc.getTemplateContent(template_type_1.TemplateType.Pipe, config, 'angular-files');
            expect(content).to.contain('export class', 'Should export service').throw;
            expect(content).to.contain('AngularFilesPipe', 'Should have a valid service name').throw;
            expect(content).to.contain('transform(', 'Should implement transform method').throw;
            expect(content.split(/\r?\n/).pop()).to.be.eql('', 'Should end with a newline').throw;
        });
        it('Should create a valid pipe spec', () => {
            const content = fc.getTemplateContent(template_type_1.TemplateType.PipeSpec, config, 'angular-files');
            expect(content).to.contain(`import { AngularFilesPipe } from './angular-files.pipe'`, 'Should have a valid import in spec').throw;
            expect(content).to.contain(`describe('Pipe: AngularFilese'`, 'Should have a valid describe in spec').throw;
            expect(content).to.contain(`expect(pipe)`, 'Should have a valid expect in spec').throw;
            expect(content.split(/\r?\n/).pop()).to.be.eql('', 'Should end with a newline').throw;
        });
    });
    describe('Module tests', () => {
        it('Should create a valid module', () => {
            const content = fc.getTemplateContent(template_type_1.TemplateType.Module, config, 'angular-files');
            expect(content).to.contain('export class AngularFilesModule', 'Should export module').throw;
            expect(content).to.contain('declarations: [AngularFilesComponent]', 'Should declare component').throw;
            expect(content).to.contain('@NgModule({', 'Should define new module').throw;
            expect(content.split(/\r?\n/).pop()).to.be.eql('', 'Should end with a newline').throw;
        });
    });
    describe('Directive tests', () => {
        it('Should create a valid directive', () => {
            const content = fc.getTemplateContent(template_type_1.TemplateType.Directive, config, 'angular-files');
            expect(content).to.contain('export class AngularFilesDirective', 'Should export directive').throw;
            expect(content).to.contain(`selector: '[appAngularFiles]'`, 'Should have a valid selector').throw;
            expect(content).to.contain('@Directive({', 'Should define new directive').throw;
            expect(content.split(/\r?\n/).pop()).to.be.eql('', 'Should end with a newline').throw;
        });
        it('Should create a valid directive with app prefix', () => {
            config.apps[0].prefix = 'ng';
            const content = fc.getTemplateContent(template_type_1.TemplateType.Directive, config, 'angular-files');
            expect(content).to.contain(`selector: '[ngAngularFiles]'`, 'Should have a valid selector').throw;
        });
        it('Should create a valid directive spec', () => {
            const content = fc.getTemplateContent(template_type_1.TemplateType.DirectiveSpec, config, 'angular-files');
            expect(content).to.contain(`import { AngularFilesDirective } from './angular-files.directive'`, 'Should have a valid import in spec').throw;
            expect(content).to.contain(`describe('Directive: AngularFiles'`, 'Should have a valid describe in spec').throw;
            expect(content).to.contain(`expect(directive)`, 'Should have a valid expect in spec').throw;
            expect(content.split(/\r?\n/).pop()).to.be.eql('', 'Should end with a newline').throw;
        });
    });
    describe('Component tests', () => {
        it('Should create a valid component', () => {
            const content = fc.getTemplateContent(template_type_1.TemplateType.Component, config, 'angular-files');
            expect(content).to.contain('export class AngularFilesComponent', 'Should export component').throw;
            expect(content).to.contain(`selector: 'app-angular-files'`, 'Should have a valid selector').throw;
            expect(content).to.contain('@Component({', 'Should define new component').throw;
            expect(content).to.contain('templateUrl', 'Should define templateUrl').throw;
            expect(content).to.contain('styleUrls', 'Should define styleUrls').throw;
            expect(content.split(/\r?\n/).pop()).to.be.eql('', 'Should end with a newline').throw;
        });
        it('Should create a valid component with app prefix', () => {
            config.apps[0].prefix = 'ng';
            const content = fc.getTemplateContent(template_type_1.TemplateType.Component, config, 'angular-files');
            expect(content).to.contain(`selector: 'ng-angular-files'`, 'Should have a valid selector').throw;
        });
        it('Should create a valid component style', () => {
            const content = fc.getTemplateContent(template_type_1.TemplateType.ComponentStyle, config, 'angular-files');
            expect(content).to.be.eql('', 'Should have a valid component style').throw;
        });
        it('Should create a valid component html', () => {
            const content = fc.getTemplateContent(template_type_1.TemplateType.ComponentHtml, config, 'angular-files');
            expect(content).to.contain('angular-files works!', 'Should have a valid html paragraph').throw;
        });
        it('Should create a valid component spec', () => {
            const content = fc.getTemplateContent(template_type_1.TemplateType.ConponentSpec, config, 'angular-files');
            expect(content).to.contain(`import { AngularFilesComponent } from './angular-files.component'`, 'Should have a valid import in spec').throw;
            expect(content).to.contain(`describe('AngularFilesComponent'`, 'Should have a valid describe in spec').throw;
            expect(content).to.contain(`expect(component)`, 'Should have a valid expect in spec').throw;
            expect(content.split(/\r?\n/).pop()).to.be.eql('', 'Should end with a newline').throw;
        });
    });
});
//# sourceMappingURL=file-contents.test.js.map