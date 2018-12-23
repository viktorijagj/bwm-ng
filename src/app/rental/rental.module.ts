import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgPipesModule } from 'ngx-pipes';
import { UppercasePipe } from '../common/pipes/uppercase.pipe';
import { MapModule } from '../common/map/map.module';
import {MapnewModule } from '../common/mapnew/mapnew.module';


import { RentalListComponent } from './rental-list/rental-list.component';
import { RentalListItemComponent } from './rental-list-item/rental-list-item.component'; 
import { RentalComponent } from './rental.component';
import {CommonModule} from '@angular/common';

import{ RentalService } from './shared/rental.service';
import { RentalDetailComponent } from './rental-detail/rental-detail.component';

const routes: Routes = [
    {path:'rentals', component: RentalComponent,
    children: [
        {path:'' , component: RentalListComponent},
        {path:':rentalId' , component: RentalDetailComponent}
    ]
},
  
  ]

@NgModule({
    declarations: [
    RentalListComponent,
    RentalListItemComponent,
    RentalComponent,
    RentalDetailComponent,
    UppercasePipe
    
    ],
    imports:[CommonModule,
            RouterModule.forChild(routes),
            HttpClientModule,
            NgPipesModule,
            MapModule,
            MapnewModule
            ],
    providers: [RentalService]
})

export class RentalModule{

}