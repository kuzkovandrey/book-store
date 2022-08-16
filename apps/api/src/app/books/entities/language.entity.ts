import { Entity, Column } from 'typeorm';

import { TableNames } from '@books/values';
import { BaseEntity } from '@config';

@Entity({ name: TableNames.LANGUAGE })
export class LanguageEntity extends BaseEntity {
  @Column({ nullable: false })
  code: string;

  @Column({ nullable: false })
  name: string;
}
