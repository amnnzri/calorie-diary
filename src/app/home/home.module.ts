import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { HomeRoutingModule } from './home.router.module'

const routes: Routes = [
  {
    path:'',
    component: HomePage,
    children :[
      
      { path: 'feed', loadChildren: '../feed/feed.module#FeedPageModule' },
            { path: 'tracker', loadChildren: '../tracker/tracker.module#TrackerPageModule' },
            { path: 'uploader', loadChildren: '../uploader/uploader.module#UploaderPageModule'},

    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeRoutingModule,
    RouterModule.forChild(routes)

  ],
  declarations: [HomePage]
})


export class HomePageModule {}
