import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { UploaderPage } from './uploader.page';
import { IonicStorageModule } from '@ionic/storage';
const routes = [
    {
        path: '',
        component: UploaderPage
    }
];
let UploaderPageModule = class UploaderPageModule {
};
UploaderPageModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            RouterModule.forChild([{ path: '', component: UploaderPage }]),
            IonicStorageModule.forRoot()
        ],
        declarations: [UploaderPage]
    })
], UploaderPageModule);
export { UploaderPageModule };
//# sourceMappingURL=uploader.module.js.map