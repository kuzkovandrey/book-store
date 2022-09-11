import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseService } from '@core/base';
import { OrderItemEntity } from '@orders/entities';

@Injectable()
export class OrderItemService extends BaseService<OrderItemEntity> {
  constructor(
    @InjectRepository(OrderItemEntity)
    repository: Repository<OrderItemEntity>
  ) {
    super(OrderItemEntity.name, repository);
  }
}
