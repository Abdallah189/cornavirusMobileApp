import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Tab4PageRoutingModule } from './tab4-routing.module';

import { Tab4Page } from './tab4.page';
import { AutosizeModule} from 'ngx-autosize';
import { ChatComponent } from './chat/chat.component';
import { WewinComponent } from './wewin/wewin.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Tab4PageRoutingModule,
    AutosizeModule
  ],
  declarations: [Tab4Page,ChatComponent,WewinComponent],
  
})
export class Tab4PageModule {}
