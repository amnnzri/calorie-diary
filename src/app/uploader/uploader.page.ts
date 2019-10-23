import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ProfileService } from 'src/app/services/profile.service';
import { CommonService } from 'src/app/services/common.service';
import { UserMenu } from '../models/user';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.page.html',
  styleUrls: ['./uploader.page.scss'],
})
export class UploaderPage implements OnInit {
  sharedFoods: Observable<UserMenu[]>;
  userFoods: Observable<UserMenu[]>;

  constructor(
    private alertController: AlertController,
    private profileService: ProfileService,
    private commonService: CommonService
  ) {}

  ngOnInit() {
    this.userFoods = this.profileService.getUserMenu();
    this.sharedFoods = this.profileService.getSharedMenu();
  }

  async editFood(food) {
    const alert = await this.alertController.create({
      header: 'Edit Food',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Example : Pizza Slice',
          value: food.name
        },
        {
          name: 'calories',
          type: 'number',
          placeholder: 'Example : 250',
          value: food.calories
        }
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Save',
          handler: data => {
            if (data.name && data.calories > 0) {
              let menu: UserMenu = {
                name: data.name,
                calories: data.calories
              };
              this.profileService.updateFoodMenu(food.id, menu).catch((error) => {
                this.commonService.handleError(error);
              });
            }
            else{
              return false;
            }
          }
        }
      ]
    });

    await alert.present();
  }

  async addFood() {
    const alert = await this.alertController.create({
      header: 'Add Food',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Example : Pizza Slice'
        },
        {
          name: 'calories',
          type: 'number',
          placeholder: 'Example : 250'
        }
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Add',
          handler: data => {
            if (data.name && data.calories > 0) {
              let menu: UserMenu = {
                name: data.name,
                calories: data.calories
              };
              this.profileService.addFoodMenu(menu).catch((error) => {
                this.commonService.handleError(error);
              });
            } else {
              return false;
            }
          }
        }
      ]
    });

    await alert.present();
  }

  async deleteFood(food) {
    const alert = await this.alertController.create({
      header: 'Delete Food',
      message: 'Are you sure to delete this food menu?',
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Delete',
          handler: () => {
            this.profileService.deleteFoodMenu(food.id).catch((error) => {
              this.commonService.handleError(error);
            });
          }
        }
      ]
    });

    await alert.present();
  }
}
