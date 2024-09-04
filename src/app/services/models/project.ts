/* tslint:disable */
/* eslint-disable */
import { Article } from '../models/article';
import { User } from '../models/user';
export interface Project {
  articles?: Array<Article>;
  chef_de_projet?: string;
  client?: User;
  'date_début'?: string;
  date_fin?: string;
  id?: number;
  name?: string;
  status?: 'Analyse' | 'InProgress' | 'Completed' | 'STOPPED';
  type_de_projet?: string;
}
