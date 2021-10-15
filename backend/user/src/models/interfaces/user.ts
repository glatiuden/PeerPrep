export enum UserRole {
  USER = "user",
  ADMIN = "admin",
}

export default interface IUser {
  _id: string;
  display_name: string;
  email: string;
  password_hash: string;
  role: UserRole;
  deleted_at?: Date;
  created_at: Date;
  updated_at: Date;
}
