import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { LanguageEntity } from '@books/entities';
import { BaseService } from '@core/base';

@Injectable()
export class LanguagesService extends BaseService<LanguageEntity> {
  constructor(
    @InjectRepository(LanguageEntity)
    repository: Repository<LanguageEntity>
  ) {
    super(LanguageEntity.name, repository);
  }

  async createIfNotExists(code: string, name: string): Promise<LanguageEntity> {
    try {
      return await this.findOneBy({ code, name });
    } catch {
      return await this.create({ code, name });
    }
  }
}
