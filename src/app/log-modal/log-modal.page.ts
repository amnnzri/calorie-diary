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
    });
    this.profileService.getSharedMenu().subscribe(arr => {
      this.sharedFoods = arr;
    });
  }

  dismiss(){
    this.modalController.dismiss();
  }

  async save() {
    const food = this.findFoodMenu(this.foodId);
    const isValid = food && this.quantity > 0;
    if (isValid) {
      this.modalController.dismiss({
        foodId: food.id,
        name: food.name,
        calories: food.calories,
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

  findFoodMenu(id: string) {
    const sf = this.sharedFoods.filter(menu => menu.id == id);
    const uf = this.userFoods.filter(menu => menu.id == id);
    if (sf.length > 0) {
      return sf[0];
    } else if (uf.length > 0) {
      return uf[0];
    } else {
      return null;
    }
  }
}
