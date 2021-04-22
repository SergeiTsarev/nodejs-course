import { Dialect } from 'sequelize';
import { Envs } from './envs';

export type DBConfig = {
  username?: string;
  database?: string;
  host?: string;
  dialect?: Dialect;
  password?: string;
  use_env_variable?: string;
};

export type DBConfigs = Partial<Record<Envs, DBConfig>>;
