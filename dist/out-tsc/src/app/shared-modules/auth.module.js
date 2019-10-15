import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuthFormComponent } from 'src/app/components/auth-form/auth-form.component';
let AuthModule = class AuthModule {
};
AuthModule = tslib_1.__decorate([
    NgModule({
        imports: [CommonModule, FormsModule, IonicModule, ReactiveFormsModule],
        declarations: [AuthFormComponent],
        exports: [AuthFormComponent],
        entryComponents: [AuthFormComponent]
    })
], AuthModule);
export { AuthModule };
//# sourceMappingURL=auth.module.js.map