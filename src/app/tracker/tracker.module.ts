import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { IonicSelectableModule } from 'ionic-selectable';

import { TrackerPage } from './tracker.page';
import { LogModalPage } from '../log-modal/log-modal.page';

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
    IonicSelectableModule,
    RouterModule.forChild([{ path: '', component: TrackerPage  }])
  ],
  declarations: [TrackerPage,LogModalPage],
  entryComponents: [LogModalPage]
})
export class TrackerPageModule {}
