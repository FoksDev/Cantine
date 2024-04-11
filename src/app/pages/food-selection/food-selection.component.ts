import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';

@Component({
  selector: 'app-food-selection',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './food-selection.component.html',
  styleUrl: './food-selection.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoodSelectionComponent implements OnInit {

  ngOnInit(): void {
    console.log('ngOnInit FoodSelectionComponent');
   }

}
