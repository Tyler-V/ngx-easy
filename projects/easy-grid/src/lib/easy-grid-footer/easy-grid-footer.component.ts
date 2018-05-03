import { Component, OnInit, HostBinding } from '@angular/core';
import { EasyGridService } from '../services/easy-grid.service';

@Component({
  selector: 'ez-grid-footer',
  templateUrl: './easy-grid-footer.component.html',
  styleUrls: ['./easy-grid-footer.component.scss']
})
export class EasyGridFooterComponent implements OnInit {

  @HostBinding('class.ez-grid-footer') class = true;

  constructor(public gridService: EasyGridService) { }

  ngOnInit() { }

  numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
}
