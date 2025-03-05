import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'price',
  standalone: true
})
export class PricePipe implements PipeTransform {
  transform(value: number | null): string {
    if (value === null || value === undefined) {
      return '$0.00';
    }

    // Format the number to always show 2 decimal places and add $ symbol
    return `$${value.toFixed(2)}`;
  }
} 