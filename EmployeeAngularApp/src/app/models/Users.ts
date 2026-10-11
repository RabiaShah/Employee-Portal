import {Designation} from '../models/Designations';
import {Department} from '../models/Departments';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  phone: number | null;
  address: string | null;
  deptId: number;
  desigId: number;
  isActive: boolean;
  dept?: Department | null;
  desig?: Designation | null;
}
