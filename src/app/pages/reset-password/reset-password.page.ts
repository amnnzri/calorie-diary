import { Component, OnInit, ViewChild } from '@angular/core';
import { UserCredential } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';
import { AuthFormComponent } from 'src/app/components/auth-form/auth-form.component';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss']
})
export class ResetPasswordPage implements OnInit {
  @ViewChild(AuthFormComponent, { static: false }) resetPasswordForm: AuthFormComponent;

  constructor(
    private authService: AuthService,
    private commonService: CommonService,
    private alertCtrl: AlertController,
    private navController: NavController
  ) {}

  ngOnInit() {}

  async resetPassword(credentials: UserCredential) {
    try {
      await this.authService.resetPassword(credentials.email);
      await this.resetPasswordForm.hideLoading();
      const alert = await this.alertCtrl.create({
        message: 'Check your inbox for the password reset link',
        buttons: [
          {
            text: 'Ok',
            role: 'cancel',
            handler: () => {
              this.navController.navigateBack('/');
            }
          }
        ]
      });
      await alert.present();
    } catch (error) {
      await this.resetPasswordForm.hideLoading();
      this.commonService.handleError(error);
    }
  }
}
