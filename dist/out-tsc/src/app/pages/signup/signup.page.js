import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AuthFormComponent } from 'src/app/components/auth-form/auth-form.component';
import { Router } from '@angular/router';
let SignupPage = class SignupPage {
    constructor(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    ngOnInit() { }
    signupUser(credentials) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const userCredential = yield this.authService.signup(credentials.email, credentials.password);
                this.authService.userId = userCredential.user.uid;
                yield this.signupForm.hideLoading();
                this.router.navigateByUrl('home');
            }
            catch (error) {
                yield this.signupForm.hideLoading();
                this.signupForm.handleError(error);
            }
        });
    }
};
tslib_1.__decorate([
    ViewChild(AuthFormComponent, { static: false }),
    tslib_1.__metadata("design:type", AuthFormComponent)
], SignupPage.prototype, "signupForm", void 0);
SignupPage = tslib_1.__decorate([
    Component({
        selector: 'app-signup',
        templateUrl: './signup.page.html',
        styleUrls: ['./signup.page.scss']
    }),
    tslib_1.__metadata("design:paramtypes", [AuthService, Router])
], SignupPage);
export { SignupPage };
//# sourceMappingURL=signup.page.js.map