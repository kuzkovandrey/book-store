import { Model } from './base.model';

export class Author {
  constructor(public firstName: string, public lastName: string) {}
}

export type AuthorModel = Model<Author>;
