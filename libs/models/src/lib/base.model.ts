export type Model<T> = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
} & T;
