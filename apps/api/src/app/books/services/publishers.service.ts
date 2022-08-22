import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PublisherEntity } from '@books/entities';
import { BaseService } from '@core/base';

@Injectable()
export class PublishersService extends BaseService<PublisherEntity> {
  constructor(
    @InjectRepository(PublisherEntity)
    private repository: Repository<PublisherEntity>
  ) {
    super(PublisherEntity.name, repository);
  }

  async createIfNotExists(name: string): Promise<PublisherEntity> {
    try {
      return await this.findBy({ name });
    } catch {
      return await this.create({ name });
    }
  }
}
