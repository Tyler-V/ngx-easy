import { Component, OnInit, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { EasyModalService } from '../easy-modal.service';

@Component({
  selector: 'ez-modal',
  templateUrl: './easy-modal.component.html',
  styleUrls: ['./easy-modal.component.scss']
})
export class EasyModalComponent implements OnInit {

  constructor(public elementRef: ElementRef, private modal: EasyModalService) { }

  ngOnInit() {
    if (this.elementRef.nativeElement.parentNode.nodeName !== 'BODY') {
      this.elementRef.nativeElement.remove();
    }
  }

  open() {
    this.modal.open();
  }

  close() {
    this.modal.close();
  }
}

