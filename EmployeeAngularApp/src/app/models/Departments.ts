import {User} from '../models/Users';
import {Designation} from '../models/Designations';

export interface Department {
  deptId: number;
  deptName: string;
  isActive: boolean;
  designations?: Designation[];
  users?: User[];
}
