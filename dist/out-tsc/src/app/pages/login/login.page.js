import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AuthFormComponent } from 'src/app/components/auth-form/auth-form.component';
import { Router } from '@angular/router';
let LoginPage = class LoginPage {
    constructor(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    ngOnInit() { }
    loginUser(credentials) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const userCredential = yield this.authService.login(credentials.email, credentials.password);
                this.authService.userId = userCredential.user.uid;
                yield this.loginForm.hideLoading();
                this.router.navigateByUrl('home');
            }
            catch (error) {
                yield this.loginForm.hideLoading();
                this.loginForm.handleError(error);
            }
        });
    }
};
tslib_1.__decorate([
    ViewChild(AuthFormComponent, { static: false }),
    tslib_1.__metadata("design:type", AuthFormComponent)
], LoginPage.prototype, "loginForm", void 0);
LoginPage = tslib_1.__decorate([
    Component({
        selector: 'app-login',
        templateUrl: './login.page.html',
        styleUrls: ['./login.page.scss']
    }),
    tslib_1.__metadata("design:paramtypes", [AuthService, Router])
], LoginPage);
export { LoginPage };
//# sourceMappingURL=login.page.js.map