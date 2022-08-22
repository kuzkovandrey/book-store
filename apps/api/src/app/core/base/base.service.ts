import {
  Repository,
  BaseEntity,
  FindOptionsWhere,
  DeepPartial,
  FindManyOptions,
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
      throw new NotFountError(this.entityName);
    }
  }

  async create(dto: DeepPartial<ENTITY>): Promise<ENTITY> {
    try {
      return await this.repo.create(dto).save();
    } catch {
      throw new IncorrectDataError(this.entityName);
    }
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
