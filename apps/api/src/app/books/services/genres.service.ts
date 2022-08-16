import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { GenreEntity } from '@books/entities';

@Injectable()
export class GenresService {
  constructor(
    @InjectRepository(GenreEntity)
    private repository: Repository<GenreEntity>
  ) {}

  findAll(): Promise<GenreEntity[]> {
    return this.repository.find();
  }

  findById(id: number): Promise<GenreEntity> {
    return this.repository.findOneBy({ id });
  }

  findByName(name: string): Promise<GenreEntity> {
    return this.repository.findOneBy({ name });
  }

  create(name: string): Promise<GenreEntity> {
    return this.repository.create({ name }).save();
  }

  async createIfNotExists(name: string): Promise<GenreEntity> {
    const genre = await this.findByName(name);

    if (genre) return genre;

    return this.create(name);
  }
}
