import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';
const routes = [
    {
        path: '',
    }
];
let LogModalPageModule = class LogModalPageModule {
};
LogModalPageModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            RouterModule.forChild(routes),
            IonicStorageModule.forRoot()
        ],
    })
], LogModalPageModule);
export { LogModalPageModule };
//# sourceMappingURL=log-modal.module.js.map