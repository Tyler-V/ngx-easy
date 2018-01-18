import { Component } from '@angular/core';
import { EasyModalService } from '../ngx-easy-modal/easy-modal.service';

@Component({
  selector: 'ez-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  open: boolean;

  constructor() { }

}
