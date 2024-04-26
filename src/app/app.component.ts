import { Component, ElementRef, OnInit, ViewChild, inject, viewChild } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { FoodSelectionComponent } from './pages/food-selection/food-selection.component';
import { ContactFormComponent } from './pages/contact-form/contact-form.component';
import { FoodService } from './services/food.service';
import { Observable } from 'rxjs';
import { IMeal } from './types/interfaces';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,LoginComponent,ContactFormComponent,FoodSelectionComponent,CommonModule,RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'cantine';
  
  isShoppingCartOpen = false;
  isLoginOpen = false;
  isLoggedIn = false;
  @ViewChild('login') dialog:ElementRef|undefined;
  foodService = inject(FoodService);
  selectedMeals: Observable<IMeal[]>;
  totalPrice: Observable<number>
  hexagons: boolean[] = []

  constructor() { 
    this.selectedMeals = this.foodService.getMeals(); 
    this.totalPrice = this.foodService.getTotalprice();
  }


  ngOnInit(): void {
    
    var height = Math.max(document.body.scrollHeight,document.body.offsetHeight,document.documentElement.clientHeight,document.documentElement.scrollHeight,document.documentElement.offsetHeight);
    const lines = height/104
    var width = Math.max(document.body.scrollWidth,document.body.offsetWidth,document.documentElement.clientWidth,document.documentElement.scrollWidth,document.documentElement.offsetWidth);
    const colume = width/90

    const totalHexagons =  lines*colume

    for (let index = 0; index < totalHexagons; index++) {
      const element = Math.random() < 0.25;
      this.hexagons.push(element);
    }

    const Loginstatus = localStorage.getItem("isLoggedIn");
    if(Loginstatus == 'login') {
      this.isLoggedIn = true
    }


  }

  toggleLogin() {
    this.isLoginOpen = !this.isLoginOpen;
    this.dialog?.nativeElement.showModal();
    console.log(this.dialog)
  }

  closeLogin() {
    this.isLoginOpen = false;
    this.dialog?.nativeElement.close();
  }
  
  onSucces() {
    this.isLoggedIn = !this.isLoggedIn
    localStorage.setItem("isLoggedIn", "login");

  }

  onLogout() {
    window.localStorage.removeItem('email');
    this.isLoggedIn = false
    localStorage.removeItem("isLoggedIn");

  }

  handleButton () {
    if(this.isLoggedIn){
      this.onLogout();
    }
    else{
      this.toggleLogin();
    }
  }

  toggleShopping() {
    this.isShoppingCartOpen = !this.isShoppingCartOpen;
    console.log('ShoppingCart');
  }

  deleteFromShoppingCart(selectedMeal: IMeal) {
    this.foodService.deleteMeal(selectedMeal);
  }
}
