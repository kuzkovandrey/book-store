import { Entity, Column, ManyToOne, OneToOne, JoinColumn } from 'typeorm';

import { DiscountEntity } from '@products/entities';
import { BookEntity } from '@books/entities';
import { TableNames } from '@core/values';
import { BaseEntity } from '@core/base';
import { CategoryEntity } from './category.entity';

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

  @ManyToOne(() => CategoryEntity, {
    onDelete: 'SET NULL',
  })
  category: CategoryEntity;

  @OneToOne(() => BookEntity, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  book: BookEntity;
}
