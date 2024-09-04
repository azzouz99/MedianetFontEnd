/* tslint:disable */
/* eslint-disable */
import { Project } from '../models/project';
export interface Article {
  attérissage?: number;
  budget?: number;
  budget_Additionnel?: number;
  consommés_H?: number;
  consommés_J?: number;
  couts?: number;
  coût_unitaire?: number;
  date_début?: Date;
  date_fin?: string;
  id?: number;
  j_restant?: number;
  j_vendus?: number;
  marge?: number;
  marge_en_montant?: number;
  marge_en_percent?: number;
  project?: Project;
  raf?: number;
  ressources?: string;
  status?:string;
  satisfaction_score?: number;
  seen:boolean;
}
