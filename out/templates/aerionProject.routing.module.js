"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
const project_component_1 = require("./project.component");
const project_list_component_1 = require("./project-list/project-list.component");
const project_create_component_1 = require("./project-create/project-create.component");
const project_edit_component_1 = require("./project-edit/project-edit.component");
const routes = [
    {
        path: '', component: project_component_1.ProjectComponent, children: [
            { path: 'edit/:id', component: project_edit_component_1.ProjectEditComponent },
            { path: 'create', component: project_create_component_1.ProjectCreateComponent },
            // { path: 'delete/:id', component: ProjectDeleteComponent },
            { path: '', component: project_list_component_1.ProjectListComponent, pathMatch: 'full' },
        ]
    },
];
let ProjectRoutingModule = class ProjectRoutingModule {
};
ProjectRoutingModule = __decorate([
    core_1.NgModule({
        exports: [router_1.RouterModule],
        imports: [router_1.RouterModule.forChild(routes)]
    })
], ProjectRoutingModule);
exports.ProjectRoutingModule = ProjectRoutingModule;
//# sourceMappingURL=aerionProject.routing.module.js.map