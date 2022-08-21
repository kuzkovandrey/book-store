import { ChangeProductValuesDto } from '@book-store/shared/dto';

export type ProductChanges = ChangeProductValuesDto & { id: number };
