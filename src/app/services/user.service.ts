import { Injectable } from '@angular/core';
import { IUser } from '../types/interfaces';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}

  async login(email: string, password: string): Promise<boolean> {
    return fetch('../../assets/db.json')
      .then((res) => res.json())
      .then((json) => {
        if (json && json.users) {
          const user = json.users.find(
            (user: IUser) => user.email === email && user.password === password
          );

          return user ? true : false;
        } else {
          return false;
        }
      });
  }
}
