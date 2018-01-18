import {
  Injectable,
  Injector,
  ComponentFactoryResolver,
  EmbeddedViewRef,
  ApplicationRef,
  ComponentRef,
  ElementRef
} from '@angular/core';

import { EasyModalComponent } from './easy-modal/easy-modal.component';

@Injectable()
export class EasyModalService {

  private componentRef: ComponentRef<EasyModalComponent>;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) { }

  open() {
    // Create a component reference from the component
    this.componentRef = this.componentFactoryResolver
      .resolveComponentFactory(EasyModalComponent)
      .create(this.injector);

    // Attach component to the appRef so that it's inside the ng component tree
    this.appRef.attachView(this.componentRef.hostView);

    // Get DOM element from component
    const domElem = (this.componentRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;

    // Append DOM element to the body
    document.body.appendChild(domElem);
  }

  close() {
    this.appRef.detachView(this.componentRef.hostView);
    this.componentRef.destroy();
  }
}
