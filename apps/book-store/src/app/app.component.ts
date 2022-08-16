import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Message } from '@book-store/api-interfaces';

@Component({
  selector: 'book-store-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  hello$ = this.http.get<any>('/api/hello');
  constructor(private http: HttpClient) {}
}
