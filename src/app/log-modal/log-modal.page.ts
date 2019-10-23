import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { ProfileService } from '../services/profile.service';
import { UserMenu } from '../models/user';
import { Observable } from 'rxjs';
import { first, filter } from 'rxjs/operators';

@Component({
  selector: 'app-log-modal',
  templateUrl: './log-modal.page.html',
  styleUrls: ['./log-modal.page.scss'],
})
export class LogModalPage implements OnInit {
  sharedFoods: any[];
  userFoods: any[];
  allFoods: any[];
  food: any;
  quantity: number;
  foodId: string;

  constructor(
    private modalController: ModalController,
    private alertController: AlertController,
    private profileService: ProfileService
  ) {}

  ngOnInit() {
    this.profileService.getUserMenu().subscribe(arr => {
      this.userFoods = arr;
      this.allFoods = arr.concat(this.sharedFoods ? this.sharedFoods : []);
      this.setDefaultFood();
    });
    this.profileService.getSharedMenu().subscribe(arr => {
      this.sharedFoods = arr;
      this.allFoods = arr.concat(this.userFoods ? this.userFoods : []);
      this.setDefaultFood();
    });
  }

  dismiss(){
    this.modalController.dismiss();
  }

  async save() {
    const isValid = this.food && this.quantity > 0;
    if (isValid) {
      this.modalController.dismiss({
        foodId: this.food.id,
        name: this.food.name,
        calories: this.food.calories,
        quantity: this.quantity
      });
    } else {
      const alert = await this.alertController.create({
        header: 'Please fill in all the inputs',
        buttons: [
          {
            text: 'OK'
          }
        ]
      });
      await alert.present();
    }
  }

  setDefaultFood() {
    if (this.allFoods && this.foodId) {
      const foods = this.allFoods.filter(menu => menu.id == this.foodId);
      if (foods.length > 0) {
        this.food = foods[0];
        return;
      }
    }
    this.food = null;
  }
}
