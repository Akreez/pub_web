import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DrinkapiService {

  constructor(private http: HttpClient) { }

  getDrinks$(){
    const url = 'http://localhost:8000/api/drinks';
    return this.http.get(url)
  }
  createDrink$(drink: any){
    const url = 'http://localhost:8000/api/drinks';
    return this.http.post(url, drink)
  }
}
