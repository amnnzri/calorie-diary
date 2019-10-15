import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TrackerPage } from './tracker.page';
import { LogModalPage } from '../log-modal/log-modal.page';
import { IonicStorageModule } from '@ionic/storage';
const routes = [
    {
        path: '',
        component: TrackerPage
    }
];
let TrackerPageModule = class TrackerPageModule {
};
TrackerPageModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            RouterModule.forChild([{ path: '', component: TrackerPage }]),
            IonicStorageModule.forRoot()
        ],
        declarations: [TrackerPage, LogModalPage],
        entryComponents: [LogModalPage]
    })
], TrackerPageModule);
export { TrackerPageModule };
//# sourceMappingURL=tracker.module.js.map