import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HomePage } from './home.page';
import { HomeRoutingModule } from './home.router.module';
const routes = [
    {
        path: '',
        component: HomePage,
        children: [
            {}
        ]
    }
];
let HomePageModule = class HomePageModule {
};
HomePageModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            HomeRoutingModule,
            RouterModule.forChild(routes)
        ],
        declarations: [HomePage]
    })
], HomePageModule);
export { HomePageModule };
//# sourceMappingURL=home.module.js.map