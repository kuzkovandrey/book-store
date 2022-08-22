import { Entity, Column } from 'typeorm';

import { TableNames } from '@core/values';
import { BaseEntity } from '@core/base';

@Entity({ name: TableNames.LANGUAGE })
export class LanguageEntity extends BaseEntity {
  @Column({ nullable: false })
  code: string;

  @Column({ nullable: false })
  name: string;
}
