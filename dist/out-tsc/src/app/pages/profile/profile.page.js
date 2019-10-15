import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';
import { AlertController } from '@ionic/angular';
let ProfilePage = class ProfilePage {
    constructor(authService, router, profileService, alertCtrl) {
        this.authService = authService;
        this.router = router;
        this.profileService = profileService;
        this.alertCtrl = alertCtrl;
    }
    ngOnInit() {
        this.profileService.getUserProfile().then(profile$ => {
            profile$.subscribe(userProfile => {
                this.userProfile = userProfile;
            });
        });
    }
    logOut() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.authService.logout();
            this.router.navigateByUrl('login');
        });
    }
    updateName() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const alert = yield this.alertCtrl.create({
                subHeader: 'Your name',
                inputs: [
                    {
                        type: 'text',
                        name: 'fullName',
                        placeholder: 'Your full name',
                        value: this.userProfile.fullName
                    }
                ],
                buttons: [
                    { text: 'Cancel' },
                    {
                        text: 'Save',
                        handler: data => {
                            this.profileService.updateName(data.fullName);
                        }
                    }
                ]
            });
            yield alert.present();
        });
    }
    updateEmail() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const alert = yield this.alertCtrl.create({
                inputs: [
                    { type: 'text', name: 'newEmail', placeholder: 'Your new email' },
                    { name: 'password', placeholder: 'Your password', type: 'password' }
                ],
                buttons: [
                    { text: 'Cancel' },
                    {
                        text: 'Save',
                        handler: data => {
                            this.profileService
                                .updateEmail(data.newEmail, data.password)
                                .then(() => {
                                console.log('Email Changed Successfully');
                            })
                                .catch(error => {
                                console.log('ERROR: ' + error.message);
                            });
                        }
                    }
                ]
            });
            yield alert.present();
        });
    }
    updatePassword() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const alert = yield this.alertCtrl.create({
                inputs: [
                    { name: 'newPassword', placeholder: 'New password', type: 'password' },
                    { name: 'oldPassword', placeholder: 'Old password', type: 'password' }
                ],
                buttons: [
                    { text: 'Cancel' },
                    {
                        text: 'Save',
                        handler: data => {
                            this.profileService.updatePassword(data.newPassword, data.oldPassword);
                        }
                    }
                ]
            });
            yield alert.present();
        });
    }
};
ProfilePage = tslib_1.__decorate([
    Component({
        selector: 'app-profile',
        templateUrl: './profile.page.html',
        styleUrls: ['./profile.page.scss']
    }),
    tslib_1.__metadata("design:paramtypes", [AuthService,
        Router,
        ProfileService,
        AlertController])
], ProfilePage);
export { ProfilePage };
//# sourceMappingURL=profile.page.js.map