import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { UserFeed, UserCalculations } from '../models/user';
import { CommonService } from '../services/common.service';
import { ProfileService } from '../services/profile.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {

  private height: number;
  private weight: number;
  private age: number;
  private gender: boolean;   // false is female,true for male
  private activityLevel: number;

  private bmiValue: number;
  private bmrValue: number;

  private bmiMessage: string;
  private dailyCalories: number;

  readonly activityLevelList = [
    { label: 'Sedentary (Little or No Exercise)', value: 1.2 },
    { label: 'Lightly Active (Light Exercise/Sports 1-3 Days Per Week)', value: 1.375 },
    { label: 'Moderateley Active (Moderate Exercise/Sports 3-5 Days Per Week)', value: 1.55 },
    { label: 'Very Active (Hard Exercise/Sports 6-7 days Per Week)', value: 1.725 },
    { label: 'Extra Active (Very Intense Exercise/Sports and Physical Job Daily)', value: 1.9 }
  ];
  readonly genderList = [
    { label: 'Male', value: true },
    { label: 'Female', value: false }
  ];

  constructor(
    private commonService: CommonService,
    private profileService: ProfileService,
    private alertController: AlertController
  ) {
    this.height = 0;
    this.weight = 0;
    this.age = 0;
    this.gender = true;
    this.activityLevel = 0;

    this.bmiValue = 0;
    this.bmrValue = 0;
    this.dailyCalories = 0;

    this.bmiMessage = null;
  }

  ngOnInit() {
    this.loadFeed();
  }

  async loadFeed() {
    const feed = await this.profileService.getUserFeed().pipe(first()).toPromise();
    if (feed) {
      this.height = (!!feed.height && feed.height > 0) ? feed.height : 0;
      this.weight = (!!feed.weight && feed.weight > 0) ? feed.weight : 0;
      this.age = (!!feed.age && feed.age > 0) ? feed.age : 0;
      this.gender = feed.gender == null ? true: feed.gender;
      this.activityLevel = (!!feed.activityLevel && feed.activityLevel > 0) ? feed.activityLevel : 0;
    }

    this.calculate();
  }

  saveAndCalculate() {
    let feed: UserFeed = {
      height: this.height,
      weight: this.weight,
      age: this.age,
      gender: this.gender,
      activityLevel: this.activityLevel
    };
    this.profileService.updateUserFeed(feed).then(() => {
      this.calculate();
    }).catch(error => {
      this.commonService.handleError(error);
      console.log('ERROR: ' + error.message);
    });
  }

  calculate() {
    let feed: UserFeed = {
      height: this.height,
      weight: this.weight,
      age: this.age,
      gender: this.gender,
      activityLevel: this.activityLevel
    };
    let calc = this.commonService.calculateCalories(feed);
    this.bmiValue = calc.bmiValue;
    this.bmrValue = calc.bmrValue;
    this.dailyCalories = calc.dailyCalories;
    this.setBMIMessage();
  }

  // setBMIMessage will set the text message based on the value of BMI
  private setBMIMessage() {
    if (this.bmiValue <= 0) {
      this.bmiMessage = '';
    } else if (this.bmiValue < 18.5) {
      this.bmiMessage = 'Underweight';
    } else if (this.bmiValue < 25) {
      this.bmiMessage = 'Normal';
    } else if (this.bmiValue < 30) {
      this.bmiMessage = 'Overweight';
    } else {
      this.bmiMessage = 'Obese';
    }
  }
}
