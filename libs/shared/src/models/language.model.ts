import { Model } from './base.model';

export type Language = {
  code: string;
  name: string;
};

export type LanguageModel = Model<Language>;
