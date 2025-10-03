export interface Booking {
  id: number;
  table : string;
  subscriberId : number;
  startTime : Date;
  endTime : Date;
  status: number;
  price: number;
}


export interface BookingLog {
  id: number;
  bookingId : number;
  time : Date;
  type : number;
  userId : number;
}
