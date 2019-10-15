import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AuthFormComponent } from 'src/app/components/auth-form/auth-form.component';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
let ResetPasswordPage = class ResetPasswordPage {
    constructor(authService, alertCtrl, router) {
        this.authService = authService;
        this.alertCtrl = alertCtrl;
        this.router = router;
    }
    ngOnInit() { }
    resetPassword(credentials) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                yield this.authService.resetPassword(credentials.email);
                yield this.resetPasswordForm.hideLoading();
                const alert = yield this.alertCtrl.create({
                    message: 'Check your inbox for the password reset link',
                    buttons: [
                        {
                            text: 'Ok',
                            role: 'cancel',
                            handler: () => {
                                this.router.navigateByUrl('login');
                            }
                        }
                    ]
                });
                yield alert.present();
            }
            catch (error) {
                yield this.resetPasswordForm.hideLoading();
                this.resetPasswordForm.handleError(error);
            }
        });
    }
};
tslib_1.__decorate([
    ViewChild(AuthFormComponent, { static: false }),
    tslib_1.__metadata("design:type", AuthFormComponent)
], ResetPasswordPage.prototype, "resetPasswordForm", void 0);
ResetPasswordPage = tslib_1.__decorate([
    Component({
        selector: 'app-reset-password',
        templateUrl: './reset-password.page.html',
        styleUrls: ['./reset-password.page.scss']
    }),
    tslib_1.__metadata("design:paramtypes", [AuthService,
        AlertController,
        Router])
], ResetPasswordPage);
export { ResetPasswordPage };
//# sourceMappingURL=reset-password.page.js.map