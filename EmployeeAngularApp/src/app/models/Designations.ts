import {User} from '../models/Users';
import {Department} from '../models/Departments';


export interface Designation {
  desigId: number;
  desigName: string | null;
  deptName: string | null;
  deptId: number;
  dept?: Department | null;
  users?: User[];
}
