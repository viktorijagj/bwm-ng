import{ Injectable } from '@angular/core';
import{ Observable } from 'rxjs';
import { ObserveOnOperator } from 'rxjs/operators/observeOn';
import { Rental } from './rental.model';
@Injectable()
export class RentalService{

    private rentals: Rental[] = [{
        id: "1",
        title: "Central Appartment",
        city: "New York",
        street: "Time Square",
        category: "appartment",
        image: "http://via.placeholder.com/350x250",
        bedrooms: 3,
        description: "Very nice appartment",
        dailyrate: 34,
        shared:false,
        createdAt: "12/12/17"
      },
      {
        id: "2",
        title: "Central House",
        city: "Barcelona",
        street: "Main Street",
        category: "house",
        image: "http://via.placeholder.com/350x250",
        bedrooms: 3,
        description: "Very nice house",
        dailyrate: 100,
        shared:false,
        createdAt: "02/07/17"
      },
      {
        id: "3",
        title: "Central Appartment",
        city: "Skopje",
        street: "Square",
        category: "appartment",
        image: "http://via.placeholder.com/350x250",
        bedrooms: 3,
        description: "Very nice and big appartment",
        dailyrate: 75,
        shared:false,
        createdAt: "01/12/16"
      },
      {
        id: "4",
        title: "Appartment",
        city: "Chicago",
        street: "Main Street",
        category: "appartment",
        image: "http://via.placeholder.com/350x250",
        bedrooms: 3,
        description: "Small but beautiful appartment",
        dailyrate: 55,
        shared:false,
        createdAt: "12/05/17"
      }];

      public getRentalById(rentalId:string):Observable<Rental>{
        return new Observable<Rental>((observer)=>{
          setTimeout(() => {
            const foundRental = this.rentals.find((rental) => {
              return rental.id == rentalId;
            });
            observer.next(foundRental);}, 500);

          });
        }

      public getRentals(): Observable<Rental[]>{
        return new Observable<Rental[]> ((observer) => {
            setTimeout(() => {
                observer.next(this.rentals);}, 1000);

        });

          
      }


}