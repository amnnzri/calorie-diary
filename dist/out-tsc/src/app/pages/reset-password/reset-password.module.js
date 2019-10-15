import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ResetPasswordPage } from './reset-password.page';
import { AuthModule } from 'src/app/shared-modules/auth.module';
const routes = [
    {
        path: '',
        component: ResetPasswordPage
    }
];
let ResetPasswordPageModule = class ResetPasswordPageModule {
};
ResetPasswordPageModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            RouterModule.forChild(routes),
            AuthModule
        ],
        declarations: [ResetPasswordPage]
    })
], ResetPasswordPageModule);
export { ResetPasswordPageModule };
//# sourceMappingURL=reset-password.module.js.map