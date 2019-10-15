import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {

  public height: number;
  public weight: number;
  public bmiValue: number;
  public bmiMessage: string;
  public age: number;
  public BMR: number;
  public bmrMessage: string;
  public gender: boolean;   // false is female,true for male
  

  public actList = [
    { strAct: 'sedentary', temp: 1.2 },
    { strAct: 'lightly', temp: 1.375 },
    { strAct: 'moderately', temp: 1.55 },
    { strAct: 'very active', temp: 1.725 },
    { strAct: 'extra active', temp: 1.9 }
  ];
  public genderList = [
    { genLab: 'Male', genTemp: false },
    { genLab: 'Female', genTemp: true }
  ];

  constructor(public navCtrl: NavController, private storage: Storage, public alertController: AlertController) {
  }

  calculateBMI() {
      if (this.weight > 0 && this.height > 0) {
        let finalBmi = this.weight / (this.height / 100 * this.height / 100);
        this.bmiValue = parseFloat(finalBmi.toFixed(2));
        this.setBMIMessage();
      }
    }
    
    // setBMIMessage will set the text message based on the value of BMI
    private setBMIMessage() {
      if (this.bmiValue < 18.5) {
        this.bmiMessage = "Underweight"
      }
    
      if (this.bmiValue > 18.5 && this.bmiValue < 25) {
        this.bmiMessage = "Normal"
      }
    
      if (this.bmiValue > 25 && this.bmiValue < 30) {
        this.bmiMessage = "Overweight"
      }
    
      if (this.bmiValue > 30) {
        this.bmiMessage = "Obese"
      }
    }

    getBMR() {
    
      let temp = String(this.gender);
      if (temp == 'false') {
        console.log('male');
        this.BMR = 66 + (6.3 * this.weight) + (12.9 * this.height) - (6.8 * this.age);
        this.BMR = parseFloat(this.BMR.toFixed(2));
      } else {
        console.log('Female');
        this.BMR = 665 + (4.35 * this.weight) + (4.7 * this.height) - (4.7 * this.age);
        this.BMR = parseFloat(this.BMR.toFixed(2));
      }
    }
    ngOnInit() {
    }
  
  }
