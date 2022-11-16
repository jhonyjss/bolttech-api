import { DataSourceOptions } from 'typeorm';

const config: DataSourceOptions = {
  type: 'mysql',
  host: 'mariadb',
  port: 3306,
  username: 'boltech',
  password: 'boltech',
  database: 'boltechDB',
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true,
};
export default config;
