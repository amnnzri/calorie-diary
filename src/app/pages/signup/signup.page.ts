import { Component, OnInit, ViewChild } from '@angular/core';
import { UserCredential } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';
import { AuthFormComponent } from 'src/app/components/auth-form/auth-form.component';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss']
})
export class SignupPage implements OnInit {
  @ViewChild(AuthFormComponent, { static: false }) signupForm: AuthFormComponent;

  constructor(
    private authService: AuthService,
    private commonService: CommonService,
    private navController: NavController
  ) {}

  ngOnInit() {}

  async signupUser(credentials: UserCredential) {
    try {
      const userCredential: firebase.auth.UserCredential = await this.authService.signup(
        credentials.email,
        credentials.password
      );
      await this.signupForm.hideLoading();
      this.navController.navigateRoot('/');
    } catch (error) {
      await this.signupForm.hideLoading();
      this.commonService.handleError(error);
    }
  }
}
