import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textOverflow',
  standalone: true,
})
export class TextOverflowPipe implements PipeTransform {
  transform(value: string, overflow: number): string {
    if (value.length < overflow) return value;

    const newValue = value.split('').slice(0, overflow).join('');

    return `${newValue}..`;
  }
}
