import { Component } from '@angular/core';

@Component({
  selector: 'grid-demo',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent {

  public data: any[];

  public gridHeight: number;

  constructor() {
    this.data = this.generate(100000);
  }

  generate(rows: number) {
    const firstNames =
      ['Tyler', 'Kelsey', 'Patrick', 'Davin', 'Elizabeth', 'Steve', 'Charlie', 'Tucker', 'Susan', 'Anthony', 'Marissa', 'Caitlin'],
      lastNames =
        ['Smith', 'Decker', 'Scudder', 'King', 'Williams', 'Johnson', 'Jones', 'Brown', 'Miller', 'Wilson', 'Anthony', 'Jackson'],
      cities =
        ['New Orleans', 'New York', 'San Diego', 'Philadelphia', 'Boston', 'Miami', 'Colombus', 'Seattle', 'Chicago', 'Nashville'],
      titles =
        ['Database Engineer', 'DevOps Engineer', 'Software Developer', 'Web Designer', 'Technical Support', 'Product Sales',
          'Quality Assurance', 'Product Manager', 'UI/UX Designer', 'Scrum Master', 'Manager'];

    function generateNumber(min, max) {
      return Math.round(Math.random() * (max - min) + min);
    }

    function generateDate(start, end) {
      return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    }

    function generatePhoneNumber() {
      return parseInt(String(Math.random() * 10000000000), 10);
    }

    return Array(rows).fill({}).map((_, idx) => ({
      id: idx + 1,
      firstName: firstNames[Math.floor(Math.random() * firstNames.length)],
      lastName: lastNames[Math.floor(Math.random() * lastNames.length)],
      city: cities[Math.floor(Math.random() * cities.length)],
      title: titles[Math.floor(Math.random() * titles.length)],
      employed: Math.random() >= 0.5,
      date: generateDate(new Date(1990, 0, 0), new Date(2017, 0, 0)),
      salary: generateNumber(50000, 250000),
      phone: generatePhoneNumber()
    }));
  }
}
