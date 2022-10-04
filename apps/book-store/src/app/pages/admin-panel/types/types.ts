import { ChangeProductValuesDto, CreateBookDto } from '@book-store/shared/dto';
import { BookModel } from '@book-store/shared/models';

export type ProductChanges = ChangeProductValuesDto & { id: number };

export type CreateBookForm = Pick<CreateBookDto, 'authors'>;

export type DeliveryForm = {
  address: string;
  schedule: {
    from: string;
    to: string;
    days: string;
  };
  isActive: boolean;
};

export type EditBookState = {
  book: BookModel;
};

export type BookCreationType = 'edit' | 'create';
