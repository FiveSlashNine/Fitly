export interface User {
  id: number;
  username: string;
  phoneNumber: string;
  email: string;
  password?: string;
  isGymOwner: boolean;
}
