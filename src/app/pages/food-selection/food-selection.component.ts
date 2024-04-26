import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Output, inject, output, type OnInit } from '@angular/core';
import { FoodService } from '../../services/food.service';
import { IMeal } from '../../types/interfaces';
import { ContactFormComponent } from "../contact-form/contact-form.component";

@Component({
    selector: 'app-food-selection',
    standalone: true,
    templateUrl: './food-selection.component.html',
    styleUrl: './food-selection.component.scss',
    imports: [
        CommonModule,
        ContactFormComponent
    ]
})
export class FoodSelectionComponent implements OnInit {

  foodService = inject(FoodService)
  meals:IMeal[] = [];
  activeFilter: string[] = []
  activeWeekDay: string|undefined;
  totalprice = 0;
  selectedMeals:IMeal[] = [];

  ngOnInit(): void {
    console.log('ngOnInit FoodSelectionComponent');
    
    this.foodService.getAll().then ((result) => {
     this.meals = result;
    }) 
    this.getMeals('Montag');
  }

  getMeals(weekday:string) {
    this.foodService.getAllWeekDay(weekday).then((result) => {
      this.meals = result.filter((element :any) => this.activeFilter.length == 0 || this.activeFilter.includes(element.category))
      this.activeWeekDay = weekday
    })
  }
  toggleFilter (filter:string) {
    
    if(this.activeFilter.includes(filter)) {
      const index = this.activeFilter.findIndex(element => element === filter);
      this.activeFilter.splice(index, 1)
    } else{
      this.activeFilter.push(filter);
    }
    console.log(this.activeFilter);
    this.getMeals(this.activeWeekDay!);
  }
  addToShoppingCart(selectedMeal:IMeal) {
      this.foodService.addMeal(selectedMeal);
  }

}
