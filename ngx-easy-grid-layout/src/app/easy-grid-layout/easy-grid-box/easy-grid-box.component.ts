import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { DragEvent } from '../directives/drag.directive';
import { Renderer2 } from '@angular/core';

import { EasyGridLayoutService } from '../easy-grid-layout.service';

@Component({
  selector: 'ez-grid-box',
  templateUrl: './easy-grid-box.component.html',
  styleUrls: ['./easy-grid-box.component.scss']
})
export class EasyGridBoxComponent implements OnInit {

  @ViewChild('box') box: ElementRef;

  public width;
  public height = 80;
  public top = '0%';
  public left = 0;

  constructor(private layoutService: EasyGridLayoutService,
    private elementRef: ElementRef,
    private sanitizer: DomSanitizer,
    private renderer: Renderer2) { }

  ngOnInit() { }

  onDrag(event: DragEvent) {
    this.renderer.setStyle(this.box.nativeElement, 'transform', `translate3d(${event.left}px, ${event.top}px, 0)`);
  }

  onDragEnd() {
    this.renderer.removeStyle(this.box.nativeElement, 'transform');
    this.renderer.setStyle(this.box.nativeElement, 'transition', `transform ${this.layoutService.animation}ms`);
    setTimeout(() => {
      this.renderer.removeStyle(this.box.nativeElement, 'transition');
    }, this.layoutService.animation);
  }

  calculateWidth() {
    return this.sanitizer.bypassSecurityTrustStyle('calc( (100% - 8px * 4) / 5)');
  }

}
