export interface Subscriber {
  id: number;
  name: string;
  lastName: string;
  parentName: string;
  parentLastName: string;
  phone: string;
  mail: string;
  parentPhone: string;
  parentMail: string;
  startDate: Date;
  endDate: Date | null; 
  purchasedHours: number;
  usedHours: number;
  isActive: boolean;
}
