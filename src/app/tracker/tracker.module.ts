import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TrackerPage } from './tracker.page';
import { LogModalPage } from '../log-modal/log-modal.page';
import { IonicStorageModule } from '@ionic/storage';

const routes: Routes = [
  {
    path: '',
    component: TrackerPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([{ path: '', component: TrackerPage  }]),
    IonicStorageModule.forRoot()
  ],
  declarations: [TrackerPage,LogModalPage],
  entryComponents: [LogModalPage]
})
export class TrackerPageModule {}
