import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { SignupPage } from './signup.page';
import { AuthModule } from 'src/app/shared-modules/auth.module';
const routes = [
    {
        path: '',
        component: SignupPage
    }
];
let SignupPageModule = class SignupPageModule {
};
SignupPageModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            RouterModule.forChild(routes),
            AuthModule
        ],
        declarations: [SignupPage]
    })
], SignupPageModule);
export { SignupPageModule };
//# sourceMappingURL=signup.module.js.map