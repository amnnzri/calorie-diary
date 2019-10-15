import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.page.html',
  styleUrls: ['./uploader.page.scss'],
})
export class UploaderPage  {
  foods: any = [];

  constructor(public navCtrl: NavController, public alertController: AlertController, private storage: Storage){
   
   this.storage.get('foodsArr').then((val) => {
     if (val != "[]"){
      this.foods = JSON.parse(val)
     }
     else{
      this.storage.set('foodsArr', JSON.stringify(this.foods));
     }
   });
   
  }

  async editFood(food) {
    const alert = await this.alertController.create({
      header: 'Edit Food',
      inputs: [
        {
          name: 'name',
          type: 'text',
          value: food.name
        },
        {
          name: 'calories',
          type: 'text',
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

              if(data.name != "" && data.calories != ""){

                let index = this.foods.indexOf(food);

                if(index > -1){
                  this.foods[index] = data;
                  this.storage.set('foodsArr', JSON.stringify(this.foods));
                }

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
          type: 'text',
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
                if(data.name != "" && data.calories != ""){

                  if (this.foods == null){
                    this.foods = [];
                    this.foods.push({
                      name: data.name,
                      calories: data.calories
                    })
                  }
                  else{
                    this.foods.push(data);
                  }
                  this.storage.set('foodsArr', JSON.stringify(this.foods));

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

  

  deleteFood(food) {

    let index = this.foods.indexOf(food);

        if(index > -1){
            this.foods.splice(index, 1);
            this.storage.set('foodsArr', JSON.stringify(this.foods));
        }

  }
}
