import { Component } from '@angular/core';
import { DrinkapiService } from '../shared/drinkapi.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-drink',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './drink.component.html',
  styleUrl: './drink.component.css'
})
export class DrinkComponent {

  drinkForm: any;
  drinks: any;
  addMode: boolean = true;

  constructor(
    private api: DrinkapiService,
    private builder: FormBuilder
  ){}

  ngOnInit(){
    this.getDrinks();
    this.drinkForm = this.builder.group({
      id: [''],
      drink: [''],
      amount: [''],
      price: [''],
      type: [''],
      package: ['']
    });
  }

  save(){
    console.log("Hozzáadás...")
    this.api.createDrink$(this.drinkForm.value).subscribe({
      next: (result)=>{
        console.log(result);
        this.drinkForm.reset();
        this.getDrinks();
      }
    })
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
