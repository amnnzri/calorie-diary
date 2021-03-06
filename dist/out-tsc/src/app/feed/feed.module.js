import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FeedPage } from './feed.page';
import { IonicStorageModule } from '@ionic/storage';
const routes = [
    {
        path: '',
        component: FeedPage
    }
];
let FeedPageModule = class FeedPageModule {
};
FeedPageModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            RouterModule.forChild(routes),
            IonicStorageModule.forRoot()
        ],
        declarations: [FeedPage]
    })
], FeedPageModule);
export { FeedPageModule };
//# sourceMappingURL=feed.module.js.map