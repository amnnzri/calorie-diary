import {NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path : 'home',
    component: HomePage,
    children : [
      {
        path: 'feed',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../feed/feed.module').then(m => m.FeedPageModule)
          }
        ]
      },
      {
        path: 'tracker',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../tracker/tracker.module').then(m => m.TrackerPageModule)
          }
        ]
      },
      {
        path: 'uploader',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../uploader/uploader.module').then(m => m.UploaderPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/home/feed',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/home/feed',
    pathMatch: 'full'
  }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule {}
