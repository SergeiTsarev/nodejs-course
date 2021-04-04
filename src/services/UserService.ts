import { v4 as uuidv4 } from 'uuid';
import { IUserService, User, UserReqBody, Users } from '../types/user';
import { userExists } from '../utils';

class UserService implements IUserService {
  private users: Users = {};

  private getAllUsers: () => User[] = () => {
    return Object.values(this.users).filter((user) => userExists(user));
  };

  public getUserByID: (id: string) => User | undefined = (id) => {
    const user = this.users[id];

    if (userExists(user)) {
      return user;
    }
  };

  public addUser: (user: UserReqBody) => User = (user) => {
    const id = uuidv4();

    const newUser: User = {
      id,
      isDeleted: false,
      ...user,
    };

    this.users[id] = newUser;

    return newUser;
  };

  public updateUser: (id: string, user: UserReqBody) => User | undefined = (id, user) => {
    const userToUpdate = this.getUserByID(id);

    if (userToUpdate) {
      const updatedUser = { ...userToUpdate, ...user };
      this.users[id] = updatedUser;

      return updatedUser;
    }
  };

  public getAutoSuggestUsers: (loginSubstring: string, limit: number) => User[] = (
    loginSubstring,
    limit,
  ) => {
    const users = this.getAllUsers();

    return users
      .filter(({ login }) => login.includes(loginSubstring))
      .slice(0, limit)
      .sort(({ login: loginA }, { login: loginB }) => loginA.localeCompare(loginB));
  };

  public deleteUser: (id: string) => User | undefined = (id) => {
    const user = this.getUserByID(id);

    if (user) {
      user.isDeleted = true;
      return user;
    }
  };
}

const instance = new UserService();

export { instance as UserService };
