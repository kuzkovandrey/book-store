import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateDeliveryPointDto } from '@book-store/shared/dto';
import { DeliveryPointEntity } from '@orders/entities/delivery-point.entity';
import { BaseService } from '@core/base';

@Injectable()
export class DeliveryService extends BaseService<DeliveryPointEntity> {
  constructor(
    @InjectRepository(DeliveryPointEntity)
    repository: Repository<DeliveryPointEntity>
  ) {
    super(DeliveryPointEntity.name, repository);
  }

  async toggleState(
    id: number,
    isActive: boolean
  ): Promise<DeliveryPointEntity> {
    const deliveryPoint = await this.findOneBy({ id });

    return this.executeElseThrowIncorrectDataError(async () => {
      deliveryPoint.isActive = isActive;
      return await deliveryPoint.save();
    });
  }

  async changeValues(
    id: number,
    { address, isActive, schedule }: CreateDeliveryPointDto
  ): Promise<DeliveryPointEntity> {
    const deliveryPoint = await this.findOneBy({ id });

    return this.executeElseThrowIncorrectDataError(async () => {
      deliveryPoint.address = address;
      deliveryPoint.isActive = isActive;
      deliveryPoint.schedule = schedule;

      return await deliveryPoint.save();
    });
  }
}
