export type User = {
  id: string;
  login: string;
  password: string;
  age: number;
  isDeleted: boolean;
};

export type Users = Record<string, User>;

export type UserReqBody = Omit<User, 'isDeleted' | 'id'>;

export interface IUserService {
  getUserByID: (id: string) => User | undefined;
  addUser: (user: UserReqBody) => User;
  updateUser: (id: string, user: UserReqBody) => User | undefined;
  getAutoSuggestUsers: (loginSubstring: string, limit: number) => User[];
  deleteUser: (id: string) => User;
}
