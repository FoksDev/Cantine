import { Routes } from '@angular/router'; 
import { FoodSelectionComponent } from './pages/food-selection/food-selection.component';
import { ProfileComponent } from './pages/profile/profile.component';

export const routes: Routes = [
  { path: '', component: FoodSelectionComponent, data: { title: '' } },
  { path: 'profil', component: ProfileComponent, data: { title: '' } },
  { path: '**', redirectTo: '', pathMatch: 'full' },
  /*
  { path: '', component: HomeSelectionComponent, data: { title: 'Startseite' } },
    Hier  können weitere Route-Verbindungen hinzugefügt werden.
    Jede Route muss einen Pfad und ein zugehörige Component haben.

    Beispiel:
      { path: 'heroes', component: LoginComponent }

    Weitere  Informationen:
    https://angular.dev/guide/routing/common-router-tasks
  */
];
