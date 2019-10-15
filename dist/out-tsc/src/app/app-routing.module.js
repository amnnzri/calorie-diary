import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { redirectUnauthorizedTo, canActivate } from '@angular/fire/auth-guard';
const redirectToLogin = redirectUnauthorizedTo(['login']);
const routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    Object.assign({ path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomePageModule) }, canActivate(redirectToLogin)),
    { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
    {
        path: 'signup',
        loadChildren: './pages/signup/signup.module#SignupPageModule'
    },
    {
        path: 'reset-password',
        loadChildren: './pages/reset-password/reset-password.module#ResetPasswordPageModule'
    },
    Object.assign({ path: 'profile', loadChildren: './pages/profile/profile.module#ProfilePageModule' }, canActivate(redirectToLogin)),
    { path: 'feed', loadChildren: './feed/feed.module#FeedPageModule' },
    { path: 'tracker', loadChildren: './tracker/tracker.module#TrackerPageModule' },
    { path: 'uploader', loadChildren: './uploader/uploader.module#UploaderPageModule' },
    { path: 'log-modal', loadChildren: './log-modal/log-modal.module#LogModalPageModule' },
];
let AppRoutingModule = class AppRoutingModule {
};
AppRoutingModule = tslib_1.__decorate([
    NgModule({
        imports: [
            RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
        ],
        exports: [RouterModule]
    })
], AppRoutingModule);
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map