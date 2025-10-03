export interface Booking {
  id: number;
  table : string;
  subscriberId : number;
  startTime : Date;
  endTime : Date;
  status: number;
  price: number;
}
