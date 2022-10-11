import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class SearchBarService {
  private readonly searchValue = new Subject<string>();

  private readonly resetInput = new Subject<void>();

  get searchValue$(): Observable<string> {
    return this.searchValue.asObservable();
  }

  get reset$(): Observable<void> {
    return this.resetInput.asObservable();
  }

  setSearchValue(text: string) {
    this.searchValue.next(text);
  }

  reset() {
    this.resetInput.next();
  }
}
