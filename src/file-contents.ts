import * as fs from 'fs';
import * as path from 'path';
import * as es6Renderer from 'express-es6-template-engine';
import { IConfig } from './models/config';
import { toCamelCase, toUpperCase } from './formatting';
import { promisify } from './promisify';
import { TemplateType } from './enums/template-type';


const fsReaddir = promisify(fs.readdir);
const fsReadFile = promisify(fs.readFile);
const TEMPLATES_FOLDER = 'templates';
const TEMPLATE_ARGUMENTS = 'inputName, upperName, interfacePrefix, cmpPrefix, dirPrefix, componentViewEncapsulation, componentChangeDetection, componentInlineTemplate, componentInlineStyle, defaultsStyleExt';

export class FileContents {
  private templatesMap: Map<string, Function>;

  constructor() {
    this.templatesMap = new Map<string, Function>();
  }

  async loadTemplates() {
    const map = new Map();

    const templatesMap = await this.getTemplates();

    for (const [key, value] of templatesMap.entries()) {
      const compiled = es6Renderer(value, TEMPLATE_ARGUMENTS);
      this.templatesMap.set(key, compiled);
    }
  }

  private async getTemplates() {
    const templatesPath = path.join(__dirname, TEMPLATES_FOLDER);
    const templatesFiles: string[] = await fsReaddir(templatesPath, 'utf-8');
    const templatesFilesPromises = templatesFiles.map(t => fsReadFile(path.join(__dirname, TEMPLATES_FOLDER, t), 'utf8').then(data => [t, data]));
    const templates = await Promise.all(templatesFilesPromises);

    return new Map(templates.map(x => x as [string, string]));
  }

  public getTemplateContent(template: TemplateType, config: IConfig, inputName: string) {
    const templateName: string = template;
    const [app] = config.apps;
    const cmpPrefix = config.defaults.component.prefix || app.prefix;
    const dirPrefix = config.defaults.directive.prefix || app.prefix;

    const args = [inputName,
      toUpperCase(inputName),
      config.defaults.interface.prefix,
      cmpPrefix,
      dirPrefix,
      config.defaults.component.viewEncapsulation,
      config.defaults.component.changeDetection,
      config.defaults.component.inlineTemplate,
      config.defaults.component.inlineStyle,
      config.defaults.styleExt];

    return (this.templatesMap.has(templateName)) ? this.templatesMap.get(templateName)(...args) : '';
  }
}
