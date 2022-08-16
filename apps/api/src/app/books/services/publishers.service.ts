import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PublisherEntity } from '@books/entities';

@Injectable()
export class PublishersService {
  constructor(
    @InjectRepository(PublisherEntity)
    private repository: Repository<PublisherEntity>
  ) {}

  findAll(): Promise<PublisherEntity[]> {
    return this.repository.find();
  }

  findById(id: number): Promise<PublisherEntity> {
    return this.repository.findOneBy({ id });
  }

  findByName(name: string): Promise<PublisherEntity> {
    return this.repository.findOneBy({ name });
  }

  create(name: string): Promise<PublisherEntity> {
    return this.repository.create({ name }).save();
  }

  async createIfNotExists(name: string): Promise<PublisherEntity> {
    const publisher = await this.findByName(name);

    if (publisher) return publisher;

    return this.create(name);
  }
}
