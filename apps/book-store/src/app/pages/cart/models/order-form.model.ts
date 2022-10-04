import { CreateOrderDto } from '@book-store/shared/dto';

export type OrderFormModel = Pick<CreateOrderDto, 'buyer' | 'deliveryPointId'>;
