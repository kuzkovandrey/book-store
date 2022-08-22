import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity as Base,
} from 'typeorm';

@Entity()
export class BaseEntity extends Base {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ nullable: false })
  createdAt: Date;

  @UpdateDateColumn({ nullable: false })
  updatedAt: Date;
}
