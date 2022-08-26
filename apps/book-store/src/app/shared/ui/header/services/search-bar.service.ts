import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

type SearchValue = string | null;

@Injectable()
export class SearchBarService {
  private text = new Subject<SearchValue>();

  get text$(): Observable<SearchValue> {
    return this.text.asObservable();
  }

  setText(text: SearchValue) {
    this.text.next(text);
  }

  clearSearchBar() {
    this.setText(null);
  }
}
