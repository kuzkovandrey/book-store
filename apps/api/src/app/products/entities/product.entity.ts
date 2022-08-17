import { Entity, Column, ManyToOne, OneToOne, JoinColumn } from 'typeorm';

import { DiscountEntity } from '@products/entities';
import { TableNames } from '@products/values';
import { BookEntity } from '@books/entities';
import { BaseEntity } from '@config';

@Entity({ name: TableNames.PRODUCT })
export class ProductEntity extends BaseEntity {
  @Column({ default: 100 })
  totalCount: number;

  @Column({ default: false })
  onSale: boolean;

  @Column({ default: null })
  cost: number;

  @ManyToOne(() => DiscountEntity)
  discount: DiscountEntity;

  @OneToOne(() => BookEntity)
  @JoinColumn({ name: 'bookId' })
  book: BookEntity;
}
