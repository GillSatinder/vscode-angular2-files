"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = {
    version: 'ng5',
    apps: [{
            root: 'src',
            prefix: 'app',
        }],
    defaults: {
        styleExt: 'css',
        component: {
            spec: true,
            inlineStyle: false,
            inlineTemplate: false,
            flat: false,
            changeDetection: 'Default',
            viewEncapsulation: 'Emulated',
            styleext: null,
            prefix: null,
            skipImport: false,
            module: 'app',
        },
        aerionProject: {
            spec: true,
            inlineStyle: false,
            inlineTemplate: false,
            flat: false,
            changeDetection: 'Default',
            viewEncapsulation: 'Emulated',
            styleext: null,
            prefix: null,
            skipImport: false,
            // these three lines are added from module to behave as both
            routing: false,
            routingScope: 'Child',
            commonModule: true,
            module: 'app',
        },
        class: {
            spec: false,
        },
        directive: {
            flat: true,
            spec: true,
            prefix: null,
        },
        guard: {
            flat: true,
            spec: true,
        },
        interface: {
            prefix: '',
        },
        module: {
            flat: false,
            spec: false,
            skipImport: false,
            routing: false,
            routingScope: 'Child',
            commonModule: true,
        },
        pipe: {
            flat: true,
            spec: true,
        },
        service: {
            flat: true,
            spec: true,
        },
    },
};
//# sourceMappingURL=cli-config.js.map