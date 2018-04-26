import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'ez-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @ViewChild('vs') vs: ElementRef;

  items = [];

  constructor() {
    this.generateVirtualItems(1000);
  }

  generateVirtualItems(amount: number) {
    function randomColor() {
      return 'rgb('
        + Math.round(Math.random() * 255) + ', '
        + Math.round(Math.random() * 255) + ', '
        + Math.round(Math.random() * 255) + ')';
    }
    for (let i = 0; i < amount; i++) {
      this.items.push({ index: i + 1, color: randomColor() });
    }
  }

  numberWithCommas(n: number) {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  dragEnd(index) {
    this.move(this.items, index.start, index.end);
  }

  move(array: any, old_index: number, new_index: number) {
    if (old_index < 0 || new_index > array.length - 1 || old_index === new_index) {
      return;
    }
    const obj = array.splice(new_index, 1, array[old_index])[0];
    array.splice(old_index, 1);
    new_index += (old_index > new_index) ? 1 : -1;
    array.splice(new_index, 0, obj);
  }
}
