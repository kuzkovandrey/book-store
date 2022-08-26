import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AuthorEntity } from '@books/entities';
import { BaseService } from '@core/base';

@Injectable()
export class AuthorsService extends BaseService<AuthorEntity> {
  constructor(
    @InjectRepository(AuthorEntity)
    repository: Repository<AuthorEntity>
  ) {
    super(AuthorEntity.name, repository);
  }

  async createIfNotExists(
    firstName: string,
    lastName: string
  ): Promise<AuthorEntity> {
    try {
      return await this.findOneBy({ firstName, lastName });
    } catch {
      return await this.create({ firstName, lastName });
    }
  }
}
