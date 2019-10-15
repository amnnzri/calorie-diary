import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { LogModalPage } from '../log-modal/log-modal.page';
import { UserProfile } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { ProfileService } from 'src/app/services/profile.service';



@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.page.html',
  styleUrls: ['./tracker.page.scss'],
})
export class TrackerPage implements OnInit {

  public userProfile: UserProfile;

  profile1 : any = {};
  logs1: any = [];

  sum: number = 0;

  currentDate = new Date;

  constructor(public navCtrl: NavController, public modalController: ModalController, private storage: Storage,private authService: AuthService,  private profileService: ProfileService){





    this.storage.get('logsArr').then((val) => {
      if (val != "[]"){
       this.logs1 = JSON.parse(val)
      }
      else{
       this.storage.set('logsArr', JSON.stringify(this.logs1));
      }
    });
    
  }

  ngOnInit() {
    this.profileService.getUserProfile().then(profile$ => {
      profile$.subscribe(userProfile => {
        this.userProfile = userProfile;
      });
    });
  }

  total(){
    this.sum = 0;
    if(this.logs1 != null){
      var logs2: any = this.logs1.filter(checkDate, this);
    }   

    function checkDate(log) {
      var logDate = new Date(log.date);
      return (logDate.getDate() == this.currentDate.getDate() && logDate.getMonth() == this.currentDate.getMonth() && logDate.getFullYear() == this.currentDate.getFullYear());
    } 

    if (logs2 != undefined){
      for(let i = 0; i<logs2.length; i++){
        this.sum = this.sum + logs2[i].calories;    
      }
    }
    
    return this.sum;

  }

  ionViewWillEnter(){
    this.storage.get('userProfile1').then((val) => {
      if (val != null){
       this.profile1 = JSON.parse(val)
      }
      else{
       this.storage.set('userProfile1', JSON.stringify(this.profile1));
      }
    });
  }

  getRemaining() {
    if (this.profile1.tdee == undefined){
      return "-";
    }
    else{
      return +this.profile1.tdee - +this.sum;
    }
  }
  

  async logFood() {
    const modal = await this.modalController.create({
      component: LogModalPage,
      componentProps: { 
        currentDate: this.currentDate
      }
    });

    modal.onDidDismiss()
      .then((data) => {
        if (data.data != undefined){
          if (this.logs1 == null){
            this.logs1 = [];
            this.logs1.push({
              name: data.data.name,
              calories: data.data.calories,
              quantity: data.data.quantity,
              date: this.currentDate
            })
          }
          else{
            this.logs1.push(data.data);
          }
          this.storage.set('logsArr', JSON.stringify(this.logs1));
        }     
    });

    await modal.present(); 

  }

  deleteLog(log) {

    let index = this.logs1.indexOf(log);

        if(index > -1){
            this.logs1.splice(index, 1);
            this.storage.set('logsArr', JSON.stringify(this.logs1));
        }

  }

  previousDay() {
    var result = new Date(this.currentDate.valueOf());
    result.setDate(result.getDate() -1);
    this.currentDate = result;
  }

  nextDay() {
    var result = new Date(this.currentDate.valueOf());
    result.setDate(result.getDate() +1);
    this.currentDate = result;
  }

  getLogs() {
    if(this.logs1 != null){
      return this.logs1.filter(checkDate, this);
    }

    function checkDate(log) {
      var logDate = new Date(log.date);
      return (logDate.getDate() == this.currentDate.getDate() && logDate.getMonth() == this.currentDate.getMonth() && logDate.getFullYear() == this.currentDate.getFullYear());
    } 
  }

  async editLog(log) {

    let log2 = {
      name1: log.name1,
      calories: (+log.calories / +log.quantity).toString()
    }


    const modal = await this.modalController.create({
      component: LogModalPage,
      componentProps: { 
        foodslct: JSON.stringify(log2),
        foodQty: log.quantity,
        currentDate: this.currentDate
      }
    });

    modal.onDidDismiss()
      .then((data) => {
        if (data.data != undefined){
          let index = this.logs1.indexOf(log);

          if(index > -1){
            this.logs1[index] = data.data;
            this.storage.set('logsArr', JSON.stringify(this.logs1));
          }
        }     
    });

    await modal.present(); 

  }
}