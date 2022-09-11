import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseService } from '@core/base';
import { BuyerEntity } from '@orders/entities';
import { Buyer, BuyerModel } from '@book-store/shared/models';

@Injectable()
export class BuyerService extends BaseService<BuyerEntity> {
  constructor(
    @InjectRepository(BuyerEntity)
    repository: Repository<BuyerEntity>
  ) {
    super(BuyerEntity.name, repository);
  }

  async createIfNotExists({ email, firstName }: Buyer): Promise<BuyerModel> {
    try {
      const buyer = await this.findOneBy({ email });
      buyer.firstName = firstName;

      return buyer.save();
    } catch {
      return await this.create({
        email,
        firstName,
      });
    }
  }
}
