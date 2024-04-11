// Hier werden Interfaces für Objekte festgelegt

import { MealCategory } from './types';

export interface IUser {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface IMeal {
  name: string;
  description?: string;
  category: MealCategory;
  price: number;
  ingredients: string[];
  imageUrl?: string;
}
