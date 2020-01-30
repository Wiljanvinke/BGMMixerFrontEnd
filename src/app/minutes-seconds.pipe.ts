import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'minutesSeconds'
})
export class MinutesSecondsPipe implements PipeTransform {

  transform(value: number): String {
    value = value / 1000;
    const minutes: number = Math.floor(value/60);
    return minutes.toString().padStart(2, '0') + ':' + 
      (value - minutes * 60).toFixed(0).toString().padStart(2, '0');
  }
}
