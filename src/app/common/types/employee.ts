export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  city: string;
  postalCode: string;
  streetName: string;
  streetNumber: string;
  position: string;
  salary: number;
  startDate: Date;
  isRemote: boolean;
  notes?: string;
}
