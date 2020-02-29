import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  @Output() requestStarted: EventEmitter<any> = new EventEmitter();
  @Output() requestFinished: EventEmitter<any> = new EventEmitter();
  private numberOfActiveRequests = 0;

  constructor() {
  }

  public startRequest(): void {
    this.numberOfActiveRequests++;
    this.requestStarted.emit(this.numberOfActiveRequests);
  }

  public finishRequest(): void {
    this.numberOfActiveRequests--;
    this.requestFinished.emit(this.numberOfActiveRequests);
  }
}
