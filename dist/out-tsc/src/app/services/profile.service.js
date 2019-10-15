import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import * as firebase from 'firebase/app';
import 'firebase/auth';
let ProfileService = class ProfileService {
    constructor(firestore, authService) {
        this.firestore = firestore;
        this.authService = authService;
    }
    getUserProfile() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const user = yield this.authService.getUser();
            this.currentUser = user;
            this.userProfile = this.firestore.doc(`userProfile/${user.uid}`);
            return this.userProfile.valueChanges();
        });
    }
    updateName(fullName) {
        return this.userProfile.update({ fullName });
    }
    getUserCalorie() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const user = yield this.authService.getUser();
            this.currentUser = user;
            this.userCalorie = this.firestore.doc(`userCalorie/${user.uid}`);
            return this.userCalorie.valueChanges();
        });
    }
    updateCalorie(calorie) {
        return this.userCalorie.update({ calorie });
    }
    updateEmail(newEmail, password) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const credential = firebase.auth.EmailAuthProvider.credential(this.currentUser.email, password);
            try {
                yield this.currentUser.reauthenticateWithCredential(credential);
                yield this.currentUser.updateEmail(newEmail);
                return this.userProfile.update({ email: newEmail });
            }
            catch (error) {
                console.error(error);
            }
        });
    }
    updatePassword(newPassword, oldPassword) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const credential = firebase.auth.EmailAuthProvider.credential(this.currentUser.email, oldPassword);
            try {
                yield this.currentUser.reauthenticateWithCredential(credential);
                return this.currentUser.updatePassword(newPassword);
            }
            catch (error) {
                console.error(error);
            }
        });
    }
};
ProfileService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [AngularFirestore,
        AuthService])
], ProfileService);
export { ProfileService };
//# sourceMappingURL=profile.service.js.map