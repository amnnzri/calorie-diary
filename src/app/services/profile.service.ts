import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';

import {
  UserProfile,
  UserFeed,
  UserMenu,
  UserTrack
} from '../models/user'

import * as firebase from 'firebase/app';
import { Observable, of } from 'rxjs';
import { first, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService
  ) {}

  getUserProfile(): Observable<UserProfile> {
    return this.authService.getCurrentUser().pipe(
      switchMap(user => {
        if (user) {
          return this.firestore.doc<UserProfile>(`userProfile/${user.uid}`).valueChanges();
        }
        return of(null);
      })
    );
  }

  async updateName(fullName: string) {
    const user = await this.authService.getCurrentUser().pipe(first()).toPromise();
    if (user) {
      this.firestore.doc(`userProfile/${user.uid}`).update({ fullName: fullName });
    }
  }

  async updateEmail(newEmail: string, password: string) {
    const user = await this.authService.getCurrentUser().pipe(first()).toPromise();
    if (user) {
      const credential: firebase.auth.AuthCredential = firebase.auth.EmailAuthProvider.credential(
        user.email,
        password
      );
      await user.reauthenticateWithCredential(credential);
      await user.updateEmail(newEmail);
      this.firestore.doc(`userProfile/${user.uid}`).update({ email: newEmail });
    }
  }

  async updatePassword(newPassword: string, oldPassword: string) {
    const user = await this.authService.getCurrentUser().pipe(first()).toPromise();
    if (user) {
      const credential: firebase.auth.AuthCredential = firebase.auth.EmailAuthProvider.credential(
        user.email,
        oldPassword
      );
      await user.reauthenticateWithCredential(credential);
      await user.updatePassword(newPassword);
    }
  }

  getUserFeed(): Observable<UserFeed> {
    return this.authService.getCurrentUser().pipe(
      switchMap(user => {
        if (user) {
          return this.firestore.doc<UserFeed>(`userFeed/${user.uid}`).valueChanges();
        }
        return of(null);
      })
    );
  }

  async updateUserFeed(feed: UserFeed) {
    if (!feed) {
      return;
    }

    const user = await this.authService.getCurrentUser().pipe(first()).toPromise();
    if (user) {
      this.firestore.doc<UserFeed>(`userFeed/${user.uid}`).set(feed);
    }
  }

  getSharedMenu(): Observable<UserMenu[]> {
    return this.firestore.collection<UserMenu>(`sharedMenu`).valueChanges({ idField: 'id' });
  }

  getUserMenu(): Observable<UserMenu[]> {
    return this.authService.getCurrentUser().pipe(
      switchMap(user => {
        if (user) {
          return this.firestore.collection<UserMenu>(`userMenu/${user.uid}/menu`).valueChanges({ idField: 'id' });
        }
        return of(null);
      })
    );
  }

  async addFoodMenu(menu: UserMenu) {
    if (!menu || !menu.name || menu.calories < 0) {
      return;
    }

    const user = await this.authService.getCurrentUser().pipe(first()).toPromise();
    if (user) {
      this.firestore.collection<UserMenu>(`userMenu/${user.uid}/menu`).add(menu);
    }
  }

  async updateFoodMenu(id: string, menu: UserMenu) {
    if (!id || !menu || !menu.name || menu.calories < 0) {
      return;
    }
    const user = await this.authService.getCurrentUser().pipe(first()).toPromise();
    if (user) {
      this.firestore.doc<UserMenu>(`userMenu/${user.uid}/menu/${id}`).set(menu);
    }
  }

  async deleteFoodMenu(id: string) {
    if (!id) {
      return;
    }
    const user = await this.authService.getCurrentUser().pipe(first()).toPromise();
    if (user) {
      this.firestore.doc<UserMenu>(`userMenu/${user.uid}/menu/${id}`).delete();
    }
  }

  getFoodTrackOfDate(date: Date): Observable<UserTrack[]> {
    return this.authService.getCurrentUser().pipe(
      switchMap(user => {
        if (user) {
          return this.firestore.collection<UserTrack>(
            `userTrack/${user.uid}/track`,
            ref => ref.where('date', '==', date)
          ).valueChanges({ idField: 'id' });
        }
        return of(null);
      })
    );
  }

  async addFoodTrack(track: UserTrack) {
    if (!track) {
      return;
    }

    const user = await this.authService.getCurrentUser().pipe(first()).toPromise();
    if (user) {
      this.firestore.collection<UserTrack>(`userTrack/${user.uid}/track`).add(track);
    }
  }

  async updateFoodTrack(id: string, track: UserTrack) {
    if (!id || !track) {
      return;
    }

    const user = await this.authService.getCurrentUser().pipe(first()).toPromise();
    if (user) {
      this.firestore.doc<UserTrack>(`userTrack/${user.uid}/track/${id}`).set(track);
    }
  }

  async deleteFoodTrack(id: string) {
    if (!id) {
      return;
    }
    const user = await this.authService.getCurrentUser().pipe(first()).toPromise();
    if (user) {
      this.firestore.doc<UserTrack>(`userTrack/${user.uid}/track/${id}`).delete();
    }
  }
}
