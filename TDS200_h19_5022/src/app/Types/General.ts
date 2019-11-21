export interface User {
  email: string;
  password: string;
}

export interface RoomInfo {
  title: string;
  description: string;
  landlord: string;
  size: number;
  creationDate: string;
  startTime?: string;
  endTime?: string;
}

export interface Room extends RoomInfo {
  image: string;
  id: string;
  rentedTo?: Timestamp;
  renter?: string;
}

// Lets help Firebase deal with its Timestamp type
interface Timestamp {
  seconds: number;
  nanoseconds: number;
}
