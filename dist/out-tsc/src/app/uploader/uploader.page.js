import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController, AlertController } from '@ionic/angular';
let UploaderPage = class UploaderPage {
    constructor(navCtrl, alertController, storage) {
        this.navCtrl = navCtrl;
        this.alertController = alertController;
        this.storage = storage;
        this.foods = [];
        this.storage.get('foodsArr').then((val) => {
            if (val != "[]") {
                this.foods = JSON.parse(val);
            }
            else {
                this.storage.set('foodsArr', JSON.stringify(this.foods));
            }
        });
    }
    editFood(food) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const alert = yield this.alertController.create({
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
                            if (data.name != "" && data.calories != "") {
                                let index = this.foods.indexOf(food);
                                if (index > -1) {
                                    this.foods[index] = data;
                                    this.storage.set('foodsArr', JSON.stringify(this.foods));
                                }
                            }
                            else {
                                return false;
                            }
                        }
                    }
                ]
            });
            yield alert.present();
        });
    }
    addFood() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const alert = yield this.alertController.create({
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
                            if (data.name != "" && data.calories != "") {
                                if (this.foods == null) {
                                    this.foods = [];
                                    this.foods.push({
                                        name: data.name,
                                        calories: data.calories
                                    });
                                }
                                else {
                                    this.foods.push(data);
                                }
                                this.storage.set('foodsArr', JSON.stringify(this.foods));
                            }
                            else {
                                return false;
                            }
                        }
                    }
                ]
            });
            yield alert.present();
        });
    }
    deleteFood(food) {
        let index = this.foods.indexOf(food);
        if (index > -1) {
            this.foods.splice(index, 1);
            this.storage.set('foodsArr', JSON.stringify(this.foods));
        }
    }
};
UploaderPage = tslib_1.__decorate([
    Component({
        selector: 'app-uploader',
        templateUrl: './uploader.page.html',
        styleUrls: ['./uploader.page.scss'],
    }),
    tslib_1.__metadata("design:paramtypes", [NavController, AlertController, Storage])
], UploaderPage);
export { UploaderPage };
//# sourceMappingURL=uploader.page.js.map