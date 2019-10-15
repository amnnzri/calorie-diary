import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
let LogModalPage = class LogModalPage {
    constructor(modalController, storage, alertController) {
        this.modalController = modalController;
        this.storage = storage;
        this.alertController = alertController;
        this.foods = [];
        this.toStr = JSON.stringify;
        this.storage.get('foodsArr').then((val) => {
            if (val != "[]") {
                this.foods = JSON.parse(val);
            }
            else {
                this.storage.set('foodsArr', JSON.stringify(this.foods));
            }
        });
    }
    ngOnInit() {
    }
    dismiss() {
        this.modalController.dismiss();
    }
    save() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (this.foodQty != undefined && this.foodslct != undefined) {
                this.foodslctSend = JSON.parse(this.foodslct);
                this.foodslctSend.quantity = this.foodQty;
                this.foodslctSend.calories = +this.foodslctSend.calories * +this.foodQty;
                this.foodslctSend.date = this.currentDate;
                this.modalController.dismiss(this.foodslctSend);
            }
            else {
                const alert = yield this.alertController.create({
                    header: 'Please fill in all the inputs',
                    buttons: [
                        {
                            text: 'OK'
                        }
                    ]
                });
                yield alert.present();
            }
        });
    }
};
LogModalPage = tslib_1.__decorate([
    Component({
        selector: 'app-log-modal',
        templateUrl: './log-modal.page.html',
        styleUrls: ['./log-modal.page.scss'],
    }),
    tslib_1.__metadata("design:paramtypes", [ModalController, Storage, AlertController])
], LogModalPage);
export { LogModalPage };
//# sourceMappingURL=log-modal.page.js.map