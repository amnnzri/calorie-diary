import { Injectable } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';

import { UserFeed, UserCalculations } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(
    private alertCtrl: AlertController
  ) {}

  async handleError(error) {
    const alert = await this.alertCtrl.create({
      message: error.message,
      buttons: [{ text: 'Ok', role: 'cancel' }]
    });
    await alert.present();
  }

  calculateCalories(feed: UserFeed): UserCalculations {
    const calc: UserCalculations = {
      bmiValue: 0,
      bmrValue: 0,
      dailyCalories: 0
    };
    if (!feed) {
      return calc;
    }

    const height = (!!feed.height && feed.height > 0) ? feed.height : 0;
    const weight = (!!feed.weight && feed.weight > 0) ? feed.weight : 0;
    const age = (!!feed.age && feed.age > 0) ? feed.age : 0;
    const gender = feed.gender == null ? true: feed.gender;
    const activityLevel = (!!feed.activityLevel && feed.activityLevel > 0) ? feed.activityLevel : 0;

    if (weight > 0 && height > 0) {
      let finalBmi = weight / (height / 100 * height / 100);
      calc.bmiValue = parseFloat(finalBmi.toFixed(2));

      if (age > 0) {
        if (gender) {
          let finalBmr = 66.473 + (13.7516 * weight) + (5.0033 * height) - (6.755 * age);
          calc.bmrValue = parseFloat(finalBmr.toFixed(2));
        } else {
          let finalBmr = 655.0955 + (9.5634 * weight) + (1.8496 * height) - (4.6756 * age);
          calc.bmrValue = parseFloat(finalBmr.toFixed(2));
        }

        if (activityLevel > 0) {
          calc.dailyCalories = parseFloat((activityLevel * calc.bmrValue).toFixed(2));
        }
      }
    }

    return calc;
  }

  utcDateFromLocalDate(dateLocal: Date): Date {
    const year = dateLocal.getFullYear();
    const month = dateLocal.getMonth();
    const date = dateLocal.getDate();
    return new Date(Date.UTC(year, month, date));
  }
}
