import { Component, OnInit } from '@angular/core';
import { EasyGridLayoutService } from '../easy-grid-layout.service';

@Component({
  selector: 'ez-grid-layout',
  templateUrl: './easy-grid-layout.component.html',
  styleUrls: ['./easy-grid-layout.component.scss']
})
export class EasyGridLayoutComponent implements OnInit {

  constructor(private layoutService: EasyGridLayoutService) { }

  ngOnInit() {
    this.layoutService.animation = 500;
  }

}
