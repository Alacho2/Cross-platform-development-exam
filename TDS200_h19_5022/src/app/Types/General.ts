export interface User {
  email: string;
  password: string;
}

export interface RoomInfo {
  title: string;
  description: string;
  landlord: string;
  size: number;
}

export interface Room extends RoomInfo {
  image: string;
}
