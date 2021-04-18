import UserModel from '../models/UserModel';

export type User = {
  id: string;
  login: string;
  password: string;
  age: number;
};

export type Users = Record<string, User>;

export type UserReqBody = Omit<User, 'isDeleted' | 'id'>;

export interface IUserService {
  getAllUsers: () => Promise<UserModel[]>;
  getUserByID: (id: string) => Promise<UserModel | null>;
  addUser: (user: UserReqBody) => Promise<UserModel>;
  updateUser: (id: string, user: UserReqBody) => Promise<[UserModel, boolean]>;
  getAutoSuggestUsers: (loginSubstring: string, limit: number) => Promise<UserModel[]>;
  deleteUser: (id: string) => Promise<number>;
}
