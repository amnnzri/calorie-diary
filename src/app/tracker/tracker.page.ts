import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { LogModalPage } from '../log-modal/log-modal.page';
import { ProfileService } from 'src/app/services/profile.service';
import { CommonService } from 'src/app/services/common.service'
import { UserTrack, UserFeed } from '../models/user';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.page.html',
  styleUrls: ['./tracker.page.scss'],
})
export class TrackerPage implements OnInit {
  currentDate: Date;
  foodTrack: Observable<UserTrack[]>;
  foodTrackArr: UserTrack[];
  userNeededCalories: number = 0;

  constructor(
    private modalController: ModalController,
    private alertController: AlertController,
    private profileService: ProfileService,
    private commonService: CommonService
  ) {
    this.currentDate = new Date;
  }

  ngOnInit() {
    this.loadFoodTrack();
    this.loadUserFeed();
  }

  loadFoodTrack() {
    this.foodTrack = this.profileService.getFoodTrackOfDate(
      this.commonService.utcDateFromLocalDate(this.currentDate));
    this.foodTrack.subscribe(arr => {
      this.foodTrackArr = arr;
    });
  }

  async loadUserFeed() {
    const feed = await this.profileService.getUserFeed().pipe(first()).toPromise();
    if (feed) {
      feed.height = (!!feed.height && feed.height > 0) ? feed.height : 0;
      feed.weight = (!!feed.weight && feed.weight > 0) ? feed.weight : 0;
      feed.age = (!!feed.age && feed.age > 0) ? feed.age : 0;
      feed.gender = feed.gender == null ? true: feed.gender;
      feed.activityLevel = (!!feed.activityLevel && feed.activityLevel > 0) ? feed.activityLevel : 0;

      let calc = this.commonService.calculateCalories(feed);

      this.userNeededCalories = calc.dailyCalories;
    }
  }

  async previousDay() {
    this.currentDate = new Date(this.currentDate.getTime() - 24*60*60*1000);
    this.loadFoodTrack();
  }

  async nextDay() {
    this.currentDate = new Date(this.currentDate.getTime() + 24*60*60*1000);
    this.loadFoodTrack();
  }

  async addFoodTrack() {
    const modal = await this.modalController.create({
      component: LogModalPage
    });

    modal.onDidDismiss()
      .then((data) => {
        if (data.data) {
          this.profileService.addFoodTrack({
            menuId: data.data.foodId,
            name: data.data.name,
            calories: data.data.calories,
            quantity: data.data.quantity,
            date: this.commonService.utcDateFromLocalDate(this.currentDate)
          }).catch((error) => {
            this.commonService.handleError(error);
          });
        }
    });

    await modal.present();
  }

  async editTrack(track) {
    const modal = await this.modalController.create({
      component: LogModalPage,
      componentProps: {
        foodId: track.menuId,
        quantity: track.quantity
      }
    });

    modal.onDidDismiss()
      .then((data) => {
        if (data.data) {
          this.profileService.updateFoodTrack(track.id,
          {
            menuId: data.data.foodId,
            name: data.data.name,
            calories: data.data.calories,
            quantity: data.data.quantity,
            date: track.date
          }).catch((error) => {
            this.commonService.handleError(error);
          });
        }
    });

    await modal.present();
  }

  async deleteTrack(track) {
    const alert = await this.alertController.create({
      header: 'Delete Track',
      message: 'Are you sure to delete this track?',
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Delete',
          handler: () => {
            this.profileService.deleteFoodTrack(track.id).catch((error) => {
              this.commonService.handleError(error);
            });
          }
        }
      ]
    });

    await alert.present();
  }

  dateTotalCalories() {
    if (this.foodTrackArr) {
      return this.foodTrackArr.reduce((a, f) => a + f.quantity * f.calories, 0);
    } else {
      return 0;
    }
  }

  dateRemainingCalories() {
    if (this.userNeededCalories > 0) {
      return parseFloat((this.userNeededCalories-this.dateTotalCalories()).toFixed(2));
    } else {
      return 0;
    }
  }
}
