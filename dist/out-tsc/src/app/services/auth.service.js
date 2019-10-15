import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { first } from 'rxjs/operators';
let AuthService = class AuthService {
    constructor(afAuth, firestore) {
        this.afAuth = afAuth;
        this.firestore = firestore;
    }
    getUser() {
        return this.afAuth.authState.pipe(first()).toPromise();
    }
    login(email, password) {
        return this.afAuth.auth.signInWithEmailAndPassword(email, password);
    }
    signup(email, password) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const newUserCredential = yield this.afAuth.auth.createUserWithEmailAndPassword(email, password);
            yield this.firestore
                .doc(`userProfile/${newUserCredential.user.uid}`)
                .set({ email });
            return newUserCredential;
        });
    }
    resetPassword(email) {
        return this.afAuth.auth.sendPasswordResetEmail(email);
    }
    logout() {
        return this.afAuth.auth.signOut();
    }
};
AuthService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [AngularFireAuth,
        AngularFirestore])
], AuthService);
export { AuthService };
//# sourceMappingURL=auth.service.js.map