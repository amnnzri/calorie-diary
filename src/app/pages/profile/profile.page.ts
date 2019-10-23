import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ProfileService } from 'src/app/services/profile.service';
import { CommonService } from 'src/app/services/common.service';
import { AlertController, NavController } from '@ionic/angular';
import { UserProfile } from 'src/app/models/user';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss']
})
export class ProfilePage implements OnInit {
  userProfile: Observable<UserProfile>;

  constructor(
    private authService: AuthService,
    private profileService: ProfileService,
    private commonService: CommonService,
    private alertCtrl: AlertController,
    private navController: NavController
  ) {}

  ngOnInit() {
    this.userProfile = this.profileService.getUserProfile();
  }

  async logOut() {
    await this.authService.logout();
    this.navController.navigateRoot('/');
  }

  async updateName() {
    const profile = await this.userProfile.pipe(first()).toPromise();
    if (profile) {
      const alert = await this.alertCtrl.create({
        subHeader: 'Your name',
        inputs: [
          {
            type: 'text',
            name: 'fullName',
            placeholder: 'Your full name',
            value: profile.fullName
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
      await alert.present();
    }
  }

  async updateEmail() {
    const alert = await this.alertCtrl.create({
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
              .updateEmail(data.newEmail, data.password).catch(error => {
                this.commonService.handleError(error);
                console.log('ERROR: ' + error.message);
              });
          }
        }
      ]
    });
    await alert.present();
  }

  async updatePassword() {
    const alert = await this.alertCtrl.create({
      inputs: [
        { name: 'newPassword', placeholder: 'New password', type: 'password' },
        { name: 'oldPassword', placeholder: 'Old password', type: 'password' }
      ],
      buttons: [
        { text: 'Cancel' },
        {
          text: 'Save',
          handler: data => {
            this.profileService.updatePassword(
              data.newPassword,
              data.oldPassword
            ).catch(error => {
              this.commonService.handleError(error);
              console.log('ERROR: ' + error.message);
            });
          }
        }
      ]
    });
    await alert.present();
  }
}
