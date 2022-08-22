import {
  Repository,
  BaseEntity,
  FindOptionsWhere,
  DeepPartial,
  FindManyOptions,
  SaveOptions,
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

  async findById(id: number): Promise<ENTITY> {
    try {
      return await this.repo.findOneByOrFail({
        id,
      } as unknown as FindOptionsWhere<ENTITY>);
    } catch {
      this.throwNotFountError();
    }
  }

  async findBy(where: FindOptionsWhere<ENTITY> | FindOptionsWhere<ENTITY>[]) {
    try {
      return await this.repo.findOneByOrFail(where);
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
      const entity = await this.findById(id);

      return await this.repo.remove(entity);
    } catch {
      this.throwNotFountError();
    }
  }

  throwNotFountError(name = this.entityName): never {
    throw new NotFountError(name);
  }

  executeElseThrowIncorrectDataError<T>(execute: () => T): T {
    try {
      return execute();
    } catch {
      throw new IncorrectDataError(this.entityName);
    }
  }

  async executePromiseElseThrowIncorrectDataError<T>(
    execute: () => Promise<T>
  ): Promise<T> {
    try {
      return await execute();
    } catch {
      throw new IncorrectDataError(this.entityName);
    }
  }
}
