import { Entity, Column } from 'typeorm';

import { BaseEntity } from '@config';
import { TableNames } from '@books/values';

@Entity({ name: TableNames.AUTHOR })
export class AuthorEntity extends BaseEntity {
  @Column({ nullable: false })
  firstName: string;

  @Column({ nullable: false })
  lastName: string;
}
