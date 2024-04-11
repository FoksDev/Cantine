import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, data: { title: 'Login Page' } },
  /*
    Hier  können weitere Route-Verbindungen hinzugefügt werden.
    Jede Route muss einen Pfad und ein zugehörige Component haben.

    Beispiel:
      { path: 'heroes', component: LoginComponent }

    Weitere  Informationen:
    https://angular.dev/guide/routing/common-router-tasks
  */
];
