import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AuthorEntity } from '@books/entities';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(AuthorEntity)
    private repository: Repository<AuthorEntity>
  ) {}

  findAll(): Promise<AuthorEntity[]> {
    return this.repository.find();
  }

  findById(id: number): Promise<AuthorEntity> {
    return this.repository.findOneBy({ id });
  }

  findByFirstAndLastName(
    firstName: string,
    lastName: string
  ): Promise<AuthorEntity> {
    return this.repository.findOneBy({ firstName, lastName });
  }

  create(firstName: string, lastName: string): Promise<AuthorEntity> {
    return this.repository
      .create({
        firstName,
        lastName,
      })
      .save();
  }

  async createIfNotExists(
    firstName: string,
    lastName: string
  ): Promise<AuthorEntity> {
    const author = await this.findByFirstAndLastName(firstName, lastName);

    if (author) return author;

    return this.create(firstName, lastName);
  }
}
