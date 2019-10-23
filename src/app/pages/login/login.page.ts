import { Component, OnInit, ViewChild } from '@angular/core';
import { UserCredential } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';
import { AuthFormComponent } from 'src/app/components/auth-form/auth-form.component';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  @ViewChild(AuthFormComponent, { static: false }) loginForm: AuthFormComponent;

  constructor(
    private authService: AuthService,
    private commonService: CommonService,
    private navController: NavController
  ) {}

  ngOnInit() {}

  async loginUser(credentials: UserCredential) {
    try {
      const userCredential: firebase.auth.UserCredential = await this.authService.login(
        credentials.email,
        credentials.password
      );
      await this.loginForm.hideLoading();
      this.navController.navigateRoot('/');
    } catch (error) {
      await this.loginForm.hideLoading();
      this.commonService.handleError(error);
    }
  }
}
