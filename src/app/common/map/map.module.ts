import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';

import { MapComponent } from './map.component';
import { MapService } from './map.service'; 
import { CamelizePipe } from 'ngx-pipes';



@NgModule({
  declarations: [
    MapComponent
    
    
  ],
  exports:[
    MapComponent
  ],
  imports: [
    AgmCoreModule.forRoot({
        apiKey: 'AIzaSyBmjgiQf0U3XTznkRdqFWNyLeZRZQvhf6A'})
    
  ],
  providers: [
    MapService,
    CamelizePipe
  ]
})
export class MapModule { }
