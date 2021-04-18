import { Model, DataTypes } from 'sequelize';
import { User } from '../types/user';
import sequelize from '../data-access';

class UserModel extends Model<User> implements User {
  public id: string;
  public login: string;
  public password: string;
  public age: number;
}

UserModel.init(
  {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    login: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: 'Users',
    sequelize,
    timestamps: true,
    paranoid: true,
  },
);

export default UserModel;
