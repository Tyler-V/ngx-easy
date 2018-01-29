import { Directive, ElementRef, Input, Output, EventEmitter, HostListener, HostBinding, Renderer2, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[ezDrag]'
})
export class DragDirective {

  @Input() movePadding = 50;
  @Input() insideParent: boolean;
  @Output() onDrag = new EventEmitter<DragEvent>();
  @Output() onDragEnd = new EventEmitter();

  private startEvent: any;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  private _getParent() {
    return this.elementRef.nativeElement.parentNode.parentNode;
  }

  @HostListener('mousedown', ['$event']) onMouseClick(e) {
    this._onDragStart(e);
  }

  @HostListener('document:mousemove', ['$event']) onDocumentMouseMove(e) {
    if (!this.startEvent) {
      return;
    }
    this._onDragging(e);
  }

  @HostListener('document:mouseup', ['$event']) onMouseUp(e) {
    this._onDragEnd(e);
  }

  private _onDragStart(e) {
    this.startEvent = e;
    this.renderer.addClass(this.elementRef.nativeElement, 'dragging');
  }

  private _onDragging(e) {
    if (this.startEvent) {
      this.onDrag.emit(this._getMove(e));
    }
  }

  private _onDragEnd(e) {
    this.startEvent = null;
    this.renderer.removeClass(this.elementRef.nativeElement, 'dragging');
    this.onDragEnd.emit();
  }

  private _getMove(e) {
    let top = e.pageY - this.startEvent.pageY;
    let left = e.pageX - this.startEvent.pageX;

    if (this.insideParent) {
      const offsetTop = this.elementRef.nativeElement.offsetTop;
      if (top + offsetTop < 0) {
        top = 0;
      }

      const offsetHeight = this.elementRef.nativeElement.offsetHeight;
      const parentOffsetHeight = this._getParent().offsetHeight;
      if (top + offsetHeight > parentOffsetHeight) {
        top = parentOffsetHeight - offsetHeight;
      }

      const offsetLeft = this.elementRef.nativeElement.offsetLeft;
      if (left + offsetLeft < 0) {
        left = 0;
      }

      const offsetWidth = this.elementRef.nativeElement.offsetWidth;
      const parentOffsetWidth = this._getParent().offsetWidth;
      if (left + offsetWidth > parentOffsetWidth) {
        left = parentOffsetWidth - offsetWidth;
      }
    }

    return <DragEvent>{
      top: top,
      left: left
    };
  }
}

export interface DragEvent {
  top: number;
  left: number;
}
