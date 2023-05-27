import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  @Output() titleHeader: EventEmitter<string> = new EventEmitter();
  @Output() descriptionHeader: EventEmitter<string> = new EventEmitter();
}
