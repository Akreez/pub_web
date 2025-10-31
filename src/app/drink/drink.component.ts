import { Component } from '@angular/core';
import { DrinkapiService } from '../shared/drinkapi.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { TypeapiService } from '../shared/typeapi.service';
import { PackageapiService } from '../shared/packageapi.service';

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
  types: any;
  packages: any;
  addMode: boolean = true;

  constructor(
    private drinkApi: DrinkapiService,
    private typeApi: TypeapiService,
    private packageApi: PackageapiService,
    private builder: FormBuilder
  ){}

  ngOnInit(){
    this.getDrinks();
    this.getTypes();
    this.getPackages();
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
    if(this.addMode){
      this.createDrink()
    }else{
      this.updateDrink()
    }
  }

  getDrinks(){
    this.drinkApi.getDrinks$().subscribe({
      next: (result: any)=> {
        console.log(result.data);
        this.drinks = result.data
      },
      error: ()=> {}
    })
  }

  createDrink(){
    this.drinkApi.createDrink$(this.drinkForm.value).subscribe({
      next: (result: any)=>{
        if(result.success){
          console.log(result);
          this.drinkForm.reset();
          this.getDrinks();
        }else{
          console.log(result)
        }
        
      }
    })
  }

  getTypes(){
    this.typeApi.getTypes$().subscribe({
      next:(result: any)=>{
        console.log(result.data)
        this.types = result.data
      }
    })
  }

  getPackages(){
    this.packageApi.getPackages$().subscribe({
      next: (result: any)=>{
        console.log(result.data)
        this.packages = result.data
      }
    })
  }

  edit(drink: any){
    this.drinkForm.patchValue(drink)
    this.addMode = false;
    // console.log(drink);
    // this.drinkForm.patchValue = {
    //   id: drink.id,
    //   drink: drink.drink,
    //   amount: drink.amount,
    //   price: drink.price,
    //   type: drink.type,
    //   package: drink.package
    // }
  }

  updateDrink(){
    this.addMode = true;
    this.drinkForm.reset();
  }

  delete(id: number){
    this.drinkApi.deleteDrink$(id).subscribe({
      next:(result: any)=>{
        console.log(result)
        this.getDrinks()
      }
    })
  }
}
