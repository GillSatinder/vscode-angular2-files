import * as path from 'path';
import { TemplateType } from './enums/template-type';
import { ResourceType } from './enums/resource-type';
import { IResource } from './models/resource';
import { OptionType } from './enums/option-type';
import { createFolder, createFolder3 } from './ioutil';
import { config } from './config/cli-config';
// tslint:disable-next-line:ter-indent
export const resources = new Map<ResourceType, IResource>([
  [ResourceType.Module, {
    locDirName: (loc, config) => (!config.defaults.module.flat) ? loc.fileName : loc.dirName,
    locDirPath: (loc, config) => path.join(loc.dirPath, loc.dirName),
    files: 
    [{ name: config => `component.${config.defaults.component.styleext || config.defaults.styleExt}`, type: TemplateType.ComponentStyle },
    { name: config => `component.html`, type: TemplateType.ComponentHtml },
    { name: config => `component.ts`, type: TemplateType.Component },
    { name: config => `module.ts`, type: TemplateType.Module },
    { name: config => `-routing.module.ts`, type: TemplateType.ModuleRouting, condition: (config, params) => config.defaults.module.routing },
    { name: config => `component.spec.ts`, type: TemplateType.ConponentSpec, condition: (config, params) => config.defaults.module.spec }],
    createFolder: config => !config.defaults.module.flat,
    options: [OptionType.Routing,
      OptionType.RoutingScope,
      OptionType.Spec,
      OptionType.Flat,
      OptionType.CommonModule,
      OptionType.Module],
  }],
  [ResourceType.Enum, { files: [{ name: config => `enum.ts`, type: TemplateType.Enum }] }],
  [ResourceType.Route, { files: [{ name: config => `routing.ts`, type: TemplateType.Route }] }],
  [ResourceType.Interface, { files: [{ name: config => `ts`, type: TemplateType.Inteface }] }],
  [ResourceType.Class, {
    files: [
      { name: config => `ts`, type: TemplateType.Class },
      { name: config => `spec.ts`, type: TemplateType.ClassSpec, condition: (config, params) => config.defaults.class.spec },
    ],
    options: [OptionType.Spec],
  }],
  [ResourceType.Service, {
    locDirName: (loc, config) => (!config.defaults.service.flat) ? loc.fileName : loc.dirName,
    locDirPath: (loc, config) => path.join(loc.dirPath, loc.dirName),
    files: [
      { name: config => `service.ts`, type: TemplateType.Service, condition: (config, params) => config.version === 'ng5' },
      { name: config => `service.ts`, type: TemplateType.ServiceNg6, condition: (config, params) => config.version === 'ng6' },
      { name: config => `service.spec.ts`, type: TemplateType.ServiceSpec, condition: (config, params) => config.defaults.service.spec },
    ],
    createFolder: config => !config.defaults.service.flat,
    options: [OptionType.Flat,
      OptionType.Spec],
  }],
  [ResourceType.Pipe, {
    locDirName: (loc, config) => (!config.defaults.pipe.flat) ? loc.fileName : loc.dirName,
    locDirPath: (loc, config) => path.join(loc.dirPath, loc.dirName),
    files: [
      { name: config => `pipe.ts`, type: TemplateType.Pipe },
      { name: config => `pipe.spec.ts`, type: TemplateType.PipeSpec, condition: (config, params) => config.defaults.pipe.spec },
    ],
    createFolder: config => !config.defaults.pipe.flat,
    declaration: 'pipe',
    options: [OptionType.Flat,
      OptionType.Spec,
      OptionType.SkipImport,
      OptionType.Module,
      OptionType.Export],
  }],
  [ResourceType.Directive, {
    locDirName: (loc, config) => (!config.defaults.directive.flat) ? loc.fileName : loc.dirName,
    locDirPath: (loc, config) => path.join(loc.dirPath, loc.dirName),
    declaration: 'directive',
    files: [
      { name: config => `directive.ts`, type: TemplateType.Directive },
      { name: config => `directive.spec.ts`, type: TemplateType.DirectiveSpec, condition: (config, params) => config.defaults.directive.spec },
    ],
    createFolder: config => !config.defaults.directive.flat,
    options: [OptionType.Prefix,
      OptionType.Spec,
      OptionType.SkipImport,
      OptionType.Selector,
      OptionType.Flat,
      OptionType.Module,
      OptionType.Export],
  }],
  [ResourceType.Component, {
    locDirName: (loc, config) => (!config.defaults.component.flat) ? loc.fileName : loc.dirName,
    locDirPath: (loc, config) => path.join(loc.dirPath, loc.dirName),
    declaration: 'component',
    files: [{ name: config => `component.ts`, type: TemplateType.Component },
    { name: config => `component.${config.defaults.component.styleext || config.defaults.styleExt}`, type: TemplateType.ComponentStyle, condition: (config, params) => !config.defaults.component.inlineStyle },
    { name: config => `component.html`, type: TemplateType.ComponentHtml, condition: (config, params) => !config.defaults.component.inlineTemplate },
    { name: config => `component.spec.ts`, type: TemplateType.ConponentSpec, condition: (config, params) => config.defaults.component.spec },
    ],
    createFolder: config => !config.defaults.component.flat,
    options: [OptionType.InlineStyle,
      OptionType.InlineTemplate,
      OptionType.ViewEncapsulation,
      OptionType.ChangeDetection,
      OptionType.Prefix,
      OptionType.Styleext,
      OptionType.Spec,
      OptionType.Flat,
      OptionType.SkipImport,
      OptionType.Selector,
      OptionType.Module,
      OptionType.Export],
  }],
  [ResourceType.AerionProject,{
    
    locDirName: (loc, config) => (!config.defaults.module.flat) ? loc.fileName : loc.dirName,
    locDirPath: (loc, config) => path.join(loc.dirPath, loc.dirName),
    createFolder: config => !config.defaults.module.flat,
    files: 
    [{ name: config => `component.${config.defaults.component.styleext || config.defaults.styleExt}`, type: TemplateType.ComponentStyle },
    { name: config => `component.html`, type: TemplateType.ComponentHtml },
    { name: config => `component.ts`, type: TemplateType.Component },
    { name: config => `module.ts`, type: TemplateType.Module },
    { name: config => `-routing.module.ts`, type: TemplateType.ModuleRouting, condition: (config, params) => config.defaults.module.routing },
    { name: config => `component.spec.ts`, type: TemplateType.ConponentSpec, condition: (config, params) => config.defaults.module.spec },
    { name: config => `component.spec.ts`, type: TemplateType.ConponentSpec, condition: (config, params) => config.defaults.component.spec },
    { name: config => `routing.ts`, type: TemplateType.Route },
    { name: config => `service.ts`, type: TemplateType.Service, condition: (config, params) => config.version === 'ng5' },
    { name: config => `service.ts`, type: TemplateType.ServiceNg6, condition: (config, params) => config.version === 'ng6' },
    { name: config => `service.spec.ts`, type: TemplateType.ServiceSpec, condition: (config, params) => config.defaults.service.spec }],
    options: [OptionType.Routing,
      OptionType.RoutingScope,
      OptionType.Spec,
      OptionType.Flat,
      OptionType.CommonModule,
      OptionType.Module,
      OptionType.Export,
      OptionType.InlineTemplate,
      OptionType.InlineStyle,
      OptionType.ViewEncapsulation],

    
    // for models folder
    locDirName2: (loc, config) => (!config.defaults.module.flat) ?  loc.fileName2 : loc.dirName2,
    locDirPath2: (loc, config) => path.join(loc.dirPath2, loc.dirName2),
    createFolder2: config => !config.defaults.module.flat,

    // for store folder
    locDirName3: (loc, config) => (!config.defaults.module.flat) ?  loc.fileName3 : loc.dirName3,
    locDirPath3: (loc, config) => path.join(loc.dirPath3, loc.dirName3),

    locDirName4: (loc, config) => (!config.defaults.module.flat) ?  loc.fileName4 : loc.dirName4,
    locDirPath4: (loc, config) => path.join(loc.dirPath4, loc.dirName4),

    locDirName5: (loc, config) => (!config.defaults.module.flat) ?  loc.fileName5 : loc.dirName5,
    locDirPath5: (loc, config) => path.join(loc.dirPath5, loc.dirName5),

    locDirName6: (loc, config) => (!config.defaults.module.flat) ?  loc.fileName6 : loc.dirName6,
    locDirPath6: (loc, config) => path.join(loc.dirPath6, loc.dirName6),

    locDirName7: (loc, config) => (!config.defaults.module.flat) ?  loc.fileName7 : loc.dirName7,
    locDirPath7: (loc, config) => path.join(loc.dirPath7, loc.dirName7),

   
    
    
    createFolder3: config => !config.defaults.module.flat,
    createFolder4: config => !config.defaults.module.flat,
    createFolder5: config => !config.defaults.module.flat,
    createFolder6: config => !config.defaults.module.flat,
    createFolder7: config => !config.defaults.module.flat,
    
    
  }],
]);
