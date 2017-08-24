import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddPage } from './add';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AddPage,
  ],
  imports: [
    IonicPageModule.forChild(AddPage),
    NgbModule,
  ],
  bootstrap: [AddPage],
})
export class AddPageModule {}
