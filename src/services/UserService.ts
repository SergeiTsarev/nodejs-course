import { v4 as uuidv4 } from 'uuid';
import { Op } from 'sequelize';
import { IUserService, UserReqBody } from '../types/user';
import UserModel from '../models/UserModel';

class UserService implements IUserService {
  public getAllUsers: () => Promise<UserModel[]> = () => {
    return UserModel.findAll();
  };

  public getUserByID: (id: string) => Promise<UserModel | null> = (id) => {
    return UserModel.findByPk(id);
  };

  public addUser: (user: UserReqBody) => Promise<UserModel> = (user) => {
    return UserModel.create({ ...user, id: uuidv4() });
  };

  public updateUser: (id: string, user: UserReqBody) => Promise<[UserModel, boolean]> = async (
    id,
    { login, password, age },
  ) => {
    const userToUpdated = await this.getUserByID(id);

    if (!userToUpdated) {
      return null;
    }

    return UserModel.upsert(
      {
        id,
        login: login ?? userToUpdated.login,
        password: password ?? userToUpdated.password,
        age: age ?? userToUpdated.age,
      },
      { returning: true },
    );
  };

  public getAutoSuggestUsers: (loginSubstring: string, limit: number) => Promise<UserModel[]> = (
    loginSubstring,
    limit,
  ) => {
    return UserModel.findAll({
      where: {
        login: {
          [Op.substring]: loginSubstring,
        },
      },
      limit,
    });
  };

  public deleteUser: (id: string) => Promise<number> = (id) => {
    return UserModel.destroy({
      where: { id },
    });
  };
}

const instance = new UserService();

export { instance as UserService };
