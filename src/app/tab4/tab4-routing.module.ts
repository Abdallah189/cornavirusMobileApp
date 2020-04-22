import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Tab4Page } from './tab4.page';
import { ChatComponent } from './chat/chat.component';
import { WewinComponent } from './wewin/wewin.component';

const routes: Routes = [
  {
    path: '',
    component: Tab4Page
  },
  {
    path:'chat',
    component:ChatComponent
  },{
    path:'win',
    component:WewinComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Tab4PageRoutingModule {}
