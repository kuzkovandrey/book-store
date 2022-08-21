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

  listenTo(): typeof BookEntity {
    return BookEntity;
  }

  afterInsert(event: InsertEvent<BookEntity>) {
    this.productsService.createBookProduct(event.entity);
  }
}
