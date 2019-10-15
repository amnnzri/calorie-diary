import { HomePage } from './home.page';
import { RouterModule, Routes } from '@angular/router';
import {NgModule} from '@angular/core'

const routes: Routes = [
    {
        path : '',
        component: HomePage,
        children : [
            { path: 'feed', loadChildren: '../feed/feed.module#FeedPageModule' },
            { path: 'tracker', loadChildren: '../tracker/tracker.module#TrackerPageModule' },
            { path: 'uploader', loadChildren: '../uploader/uploader.module#UploaderPageModule'},
           
            
            ]
    }



];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule { }
