import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';

import { BookEntity } from '@books/entities';
import { ProductsService } from '@products/services';

@EventSubscriber()
export class BooksSubscriber implements EntitySubscriberInterface<BookEntity> {
  constructor(
    dataSource: DataSource,
    private productsService: ProductsService
  ) {
    dataSource.subscribers.push(this);
  }

  listenTo() {
    return BookEntity;
  }

  beforeInsert(event: InsertEvent<BookEntity>) {
    console.log(`BEFORE USER INSERTED: `, event.entity);
    this.productsService.createBookProduct(event.entity);
  }
}
