export interface Booking {
  id: number;
  tableId? : number;
  startTime : Date;
  endTime : Date;
  status: number;
  price: number;
  customerId?: number;
  note?: string;
}


export interface BookingLog {
  id: number;
  bookingId : number;
  time : Date;
  type : number;
  userId : number;
}
