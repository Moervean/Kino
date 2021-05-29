import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'monthPipe'
})
export class MonthPipePipe implements PipeTransform {
  month: string;

  transform(date: string): unknown {

    const dateTab = date.split('-');
    switch (+dateTab[1]){
      case 1: this.month = 'stycznia'; break;
      case 2: this.month = 'lutego'; break;
      case 3: this.month = 'marca'; break;
      case 4: this.month = 'kwietnia'; break;
      case 5: this.month = 'maja'; break;
      case 6: this.month = 'czerwca'; break;
      case 7: this.month = 'lipca'; break;
      case 8: this.month = 'sierpnia'; break;
      case 9: this.month = 'wrzesnia'; break;
      case 10: this.month = 'pazdziernika'; break;
      case 11: this.month = 'listopada'; break;
      case 12: this.month = 'grudnia'; break;
    }
    console.log(this.month);
    return dateTab[2] + ' ' + this.month + ' ' + dateTab[0];
  }

}
