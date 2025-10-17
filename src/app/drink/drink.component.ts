import { Component } from '@angular/core';
import { DrinkapiService } from '../shared/drinkapi.service';

@Component({
  selector: 'app-drink',
  standalone: true,
  imports: [],
  templateUrl: './drink.component.html',
  styleUrl: './drink.component.css'
})
export class DrinkComponent {

  drinks: any;

  constructor(private api: DrinkapiService){}

  ngOnInit(){
    this.getDrinks();
  }

  getDrinks(){
    this.api.getDrinks$().subscribe({
      next: (result:any)=> {
        console.log(result.data);
        this.drinks = result.data
      },
      error: ()=> {}
    })
  }
}
