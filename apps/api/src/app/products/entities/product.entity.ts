import { Entity, Column, ManyToOne, OneToOne, JoinColumn } from 'typeorm';

import { DiscountEntity } from '@products/entities';
import { BookEntity } from '@books/entities';
import { TableNames } from '@core/values';
import { BaseEntity } from '@core/base';

@Entity({ name: TableNames.PRODUCT })
export class ProductEntity extends BaseEntity {
  @Column({ default: 100, type: 'int' })
  totalCount: number;

  @Column({ default: false, type: 'boolean' })
  onSale: boolean;

  @Column({ default: null, type: 'int' })
  cost: number;

  @ManyToOne(() => DiscountEntity, {
    onDelete: 'SET NULL',
  })
  discount: DiscountEntity;

  @OneToOne(() => BookEntity)
  @JoinColumn()
  book: BookEntity;
}
