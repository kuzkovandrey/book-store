import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { GenreEntity } from '@books/entities';
import { BaseService } from '@core/base';

@Injectable()
export class GenresService extends BaseService<GenreEntity> {
  constructor(
    @InjectRepository(GenreEntity)
    repository: Repository<GenreEntity>
  ) {
    super(GenreEntity.name, repository);
  }

  async createIfNotExists(name: string): Promise<GenreEntity> {
    try {
      return await this.findOneBy({ name });
    } catch {
      return await this.create({ name });
    }
  }
}
