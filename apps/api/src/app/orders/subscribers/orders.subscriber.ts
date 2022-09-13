import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import { Logger } from '@nestjs/common';

import { OrderEntity } from '@orders/entities';
import { MailService } from '@core/mail';
import { getSuccesOrderMailOptions } from '@core/utils';

@EventSubscriber()
export class OrdersSubscriber
  implements EntitySubscriberInterface<OrderEntity>
{
  constructor(dataSource: DataSource, private mailService: MailService) {
    dataSource.subscribers.push(this);
  }

  listenTo(): typeof OrderEntity {
    return OrderEntity;
  }

  afterInsert({ entity: order }: InsertEvent<OrderEntity>) {
    try {
      this.mailService.sendEmail(getSuccesOrderMailOptions(order));
    } catch (e) {
      Logger.error(e);
    }
  }
}
