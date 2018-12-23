import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { MapnewService } from './mapnew.service';

@Component({
  selector: 'bwm-mapnew',
  templateUrl: './mapnew.component.html',
  styleUrls: ['./mapnew.component.scss']
})
export class MapnewComponent {
  

  @Input() location:string;
  isPositionError: boolean = false;

  lat: number;
  lng: number;
  constructor(private mapnewService: MapnewService,
              private ref: ChangeDetectorRef) { }

  mapReadyHandler(){
    // let currentLocation = this.location; //making an error
    // if(Math.round(Math.random() *10) >5){
    //   currentLocation = "dsafsafdsfdsafdafa";
    // }
    this.mapnewService.getLocation(this.location).subscribe(
    (coordinates) =>{
      this.lat = coordinates.lat;
      this.lng = coordinates.lng;
      this.ref.detectChanges();
    }, ()=>{
      this.isPositionError = true;
    });

  }
}
