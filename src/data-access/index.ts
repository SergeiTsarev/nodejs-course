import { Sequelize } from 'sequelize';
import dbConfigs from '../config/database.json';
import { Envs } from '../types/envs';
import { DBConfig, DBConfigs } from '../types/db';

const env = (process.env.NODE_ENV || 'development') as Envs;

const configs = dbConfigs as DBConfigs;
const { database, username, password, ...options } = configs[env] as DBConfig;

const logger: (msg: string) => void = (...msg) => console.log(msg);

const sequelize = new Sequelize(database, username, password, {
  ...options,
  logging: logger,
});

sequelize.authenticate().then((msg) => console.log(msg));

export default sequelize;
