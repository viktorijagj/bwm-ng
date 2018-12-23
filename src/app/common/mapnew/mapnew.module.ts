import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import {CommonModule} from '@angular/common';

import { MapnewComponent } from './mapnew.component';
import { MapnewService } from './mapnew.service';
import { CamelizePipe } from "ngx-pipes";

@NgModule({
  declarations: [
    MapnewComponent
        
  ],
  imports: [
    CommonModule,
    AgmCoreModule.forRoot({
        apiKey:'AIzaSyBmjgiQf0U3XTznkRdqFWNyLeZRZQvhf6A'
        
    })
  ],
  exports: [
  MapnewComponent
  ],
  providers: [
      MapnewService,
      CamelizePipe
  ],

})
export class MapnewModule { }
