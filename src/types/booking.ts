export interface Booking {
  id: number;
  tableId? : number;
  startTime : Date;
  endTime : Date;
  status: number;
  price: number;
  customerId?: number;
  note?: string;
  purchaseId?:number;
  subscriptionStartTime?:Date;
  subscriptionEndTime?:Date;
}

export interface BookingLog {
  id: number;
  bookingId : number;
  time : Date;
  type : number;
  userId : number;
}
