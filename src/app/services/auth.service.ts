import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {}

  getCurrentUser(): Observable<firebase.User> {
    return this.afAuth.authState;
  }

  async login(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  async signup(email: string, password: string): Promise<firebase.auth.UserCredential> {
    const newUserCredential: firebase.auth.UserCredential = await this.afAuth.auth.createUserWithEmailAndPassword(
      email,
      password
    );
    await this.firestore
      .doc(`userProfile/${newUserCredential.user.uid}`)
      .set({ email });
    return newUserCredential;
  }

  async resetPassword(email: string) {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }

  async logout() {
    return this.afAuth.auth.signOut();
  }
}
