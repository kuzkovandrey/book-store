import { AppRoutes } from '@core/values/app-routes.enum';

type Route = {
  title: string;
  path: string;
};

export const MenuRoutes: Route[] = [
  {
    title: 'Новая книга',
    path: AppRoutes.BOOKS,
  },
  {
    title: 'Все книги',
    path: AppRoutes.PRODUCTS,
  },
  {
    title: 'Скидки',
    path: AppRoutes.DISCOUNTS,
  },
];