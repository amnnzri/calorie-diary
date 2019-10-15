import * as tslib_1 from "tslib";
import { HomePage } from './home.page';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
const routes = [
    {
        path: '',
        component: HomePage,
        children: [
            { path: 'feed', loadChildren: '../feed/feed.module#FeedPageModule' },
            { path: 'tracker', loadChildren: '../tracker/tracker.module#TrackerPageModule' },
            { path: 'uploader', loadChildren: '../uploader/uploader.module#UploaderPageModule' },
        ]
    }
];
let HomeRoutingModule = class HomeRoutingModule {
};
HomeRoutingModule = tslib_1.__decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })
], HomeRoutingModule);
export { HomeRoutingModule };
//# sourceMappingURL=home.router.module.js.map