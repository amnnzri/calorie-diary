import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
let AuthFormComponent = class AuthFormComponent {
    constructor(formBuilder, loadingCtrl, alertCtrl) {
        this.formBuilder = formBuilder;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.isPasswordResetPage = false;
        this.formSubmitted = new EventEmitter();
        this.authForm = this.formBuilder.group({
            email: ['', Validators.compose([Validators.required, Validators.email])],
            password: ['', Validators.minLength(6)]
        });
    }
    ngOnInit() { }
    submitCredentials(authForm) {
        if (!authForm.valid) {
            console.log('Form is not valid yet, current value:', authForm.value);
        }
        else {
            this.showLoading();
            const credentials = {
                email: authForm.value.email,
                password: authForm.value.password
            };
            this.formSubmitted.emit(credentials);
        }
    }
    showLoading() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.loading = yield this.loadingCtrl.create();
            yield this.loading.present();
        });
    }
    hideLoading() {
        return this.loading.dismiss();
    }
    handleError(error) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const alert = yield this.alertCtrl.create({
                message: error.message,
                buttons: [{ text: 'Ok', role: 'cancel' }]
            });
            yield alert.present();
        });
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", String)
], AuthFormComponent.prototype, "actionButtonText", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], AuthFormComponent.prototype, "isPasswordResetPage", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", Object)
], AuthFormComponent.prototype, "formSubmitted", void 0);
AuthFormComponent = tslib_1.__decorate([
    Component({
        selector: 'app-auth-form',
        templateUrl: './auth-form.component.html',
        styleUrls: ['./auth-form.component.scss']
    }),
    tslib_1.__metadata("design:paramtypes", [FormBuilder,
        LoadingController,
        AlertController])
], AuthFormComponent);
export { AuthFormComponent };
//# sourceMappingURL=auth-form.component.js.map