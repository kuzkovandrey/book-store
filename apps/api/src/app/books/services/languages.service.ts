import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { LanguageEntity } from '@books/entities';

@Injectable()
export class LanguagesService {
  constructor(
    @InjectRepository(LanguageEntity)
    private repository: Repository<LanguageEntity>
  ) {}

  findAll(): Promise<LanguageEntity[]> {
    return this.repository.find();
  }

  findById(id: number): Promise<LanguageEntity> {
    return this.repository.findOneBy({ id });
  }

  findByCodeAndName(code: string, name: string): Promise<LanguageEntity> {
    return this.repository.findOneBy({ code, name });
  }

  create(code: string, name: string): Promise<LanguageEntity> {
    return this.repository.create({ code, name }).save();
  }

  async createIfNotExists(code: string, name: string): Promise<LanguageEntity> {
    const language = await this.findByCodeAndName(code, name);

    if (language) return language;

    return this.create(code, name);
  }
}
