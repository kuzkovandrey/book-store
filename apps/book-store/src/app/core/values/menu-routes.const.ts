import { AppRoutes } from './app-routes.enum';

export const MenuRoutes = [
  {
    path: AppRoutes.MAIN,
    title: 'Главная',
  },
  {
    path: AppRoutes.SEARCH,
    title: 'Поиск',
  },
  {
    path: AppRoutes.CART,
    title: 'Корзина товаров',
  },
] as const;
