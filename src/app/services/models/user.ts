/* tslint:disable */
/* eslint-disable */
import { GrantedAuthority } from '../models/granted-authority';
import { Project } from '../models/project';
import { Role } from '../models/role';
export interface User {
  accountNonExpired?: boolean;
  accountNonLocked?: boolean;
  authorities?: Array<GrantedAuthority>;
  createdDate?: string;
  credentialsNonExpired?: boolean;
  email?: string;
  enabled?: boolean;
  firstname?: string;
  id?: number;
  image?: string;
  lastModifiedDate?: string;
  lastname?: string;
  password?: string;
  projects?: Array<Project>;
  roles?: Array<Role>;
  username?: string;
}
