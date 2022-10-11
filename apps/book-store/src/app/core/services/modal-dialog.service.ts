import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { TuiDialogService } from '@taiga-ui/core';
import { Injectable, Type } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class ModalDialogService {
  constructor(private dialogService: TuiDialogService) {}

  open<C extends object, R>(component: Type<C>): Observable<R> {
    return this.dialogService.open(new PolymorpheusComponent(component));
  }
}
