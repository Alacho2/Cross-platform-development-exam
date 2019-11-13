export interface User {
  email: string;
  password: string;
}

export interface RoomInfo {
  description: string;
  landlord: string;
  size: number;
}

export interface Room extends RoomInfo {
  imageRef: string;
}
