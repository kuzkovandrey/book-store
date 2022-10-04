import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class SearchBarService {
  private readonly searchText = new Subject<string>();

  private readonly resetInput = new Subject<void>();

  get search$(): Observable<string> {
    return this.searchText.asObservable();
  }

  get reset$(): Observable<void> {
    return this.resetInput.asObservable();
  }

  search(text: string) {
    this.searchText.next(text);
  }

  reset() {
    this.resetInput.next();
  }
}
