import { Injectable } from '@angular/core';
import { IMeal } from '../types/interfaces';
import { Subject, BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  selectedMeals: Subject<IMeal[]> = new BehaviorSubject<IMeal[]>([]);
   totalprice: Subject<number> = new BehaviorSubject<number>(0);
  _selectedMeals: IMeal[];
  _totalprice = 0
  
  constructor() {  this._selectedMeals = []; }
  async getAll() {
    return fetch ('../assets/database/db.json')
    .then((result) => result.json())
    .then((json) =>{
      return json.meals;
    })
  }
  async getAllWeekDay(weekday: string) {
    const meals = await this.getAll();
    
    switch (weekday) {
      case 'Montag':
        return meals.slice(0, 6);
      case 'Dienstag':
        return meals.slice(6, 12);
      case 'Mittwoch':
        return meals.slice(12, 18);
      case 'Donnerstag':
        return meals.slice(18, 24);
      case 'Freitag':
        return meals.slice(24, 30);
      case 'Samstag':
        return meals.slice(30, 36);
      case 'Sonntag':
        return meals.slice(36, 42);
      default:
        return [];
    }
  }
  

  getMeals() {
    return this.selectedMeals.asObservable();
  }
  getTotalprice(){
    return this.totalprice.asObservable();
  }
  addMeal(selectedMeal: IMeal) {
    this._selectedMeals.push(selectedMeal);
    this.selectedMeals.next(this._selectedMeals);

    const initialValue = 0;
    this._totalprice = this._selectedMeals.reduce(
      (accumulator, currentMeal) => accumulator + currentMeal.price,
      initialValue
    );

    this.totalprice.next(this._totalprice);
  }

  deleteMeal(selectedMeal: IMeal){
    const index = this._selectedMeals.findIndex(element => element === selectedMeal);
    this._selectedMeals.splice(index, 1);
    this.selectedMeals.next(this._selectedMeals);

    const initialValue = 0;
    this._totalprice = this._selectedMeals.reduce(
      (accumulator, currentMeal) => accumulator + currentMeal.price,
      initialValue
    );
    this.totalprice.next(this._totalprice);
  }
  
}
