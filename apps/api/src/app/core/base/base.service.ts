import {
  Repository,
  BaseEntity,
  FindOptionsWhere,
  DeepPartial,
  FindManyOptions,
  SaveOptions,
  FindOptionsRelations,
} from 'typeorm';
import { IncorrectDataError, NotFountError } from '@core/values';

export abstract class BaseService<ENTITY extends BaseEntity> {
  constructor(
    private readonly entityName: string,
    private readonly repo: Repository<ENTITY>
  ) {}

  findAll(options?: FindManyOptions<ENTITY>): Promise<ENTITY[]> {
    return this.repo.find(options);
  }

  async findOneBy(
    where: FindOptionsWhere<ENTITY> | FindOptionsWhere<ENTITY>[],
    relations?: FindOptionsRelations<ENTITY>
  ) {
    try {
      const entity = await this.repo.findOne({ where, relations });

      if (!entity) throw new Error();

      return entity;
    } catch {
      this.throwNotFountError();
    }
  }

  async create(dto: DeepPartial<ENTITY>): Promise<ENTITY> {
    try {
      return await this.repo.create(dto).save();
    } catch {
      throw new IncorrectDataError(this.entityName);
    }
  }

  async save<T extends DeepPartial<ENTITY>>(
    entity: T,
    options?: SaveOptions
  ): Promise<T & ENTITY> {
    try {
      return await this.repo.save(entity, options);
    } catch {
      throw new IncorrectDataError(this.entityName);
    }
  }

  async deleteById(id: number): Promise<ENTITY> {
    try {
      const entity = await this.repo.findOneByOrFail({
        id,
      } as unknown as FindOptionsWhere<ENTITY>);

      return await this.repo.remove(entity);
    } catch {
      this.throwNotFountError();
    }
  }

  throwNotFountError(name = this.entityName): never {
    throw new NotFountError(name);
  }

  async executeElseThrowIncorrectDataError<T>(
    execute: () => Promise<T>
  ): Promise<T> {
    try {
      return await execute();
    } catch {
      throw new IncorrectDataError(this.entityName);
    }
  }
}
