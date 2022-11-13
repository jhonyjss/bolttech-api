import { ConnectionOptions } from 'typeorm';

const config: ConnectionOptions = {
  type: 'mysql',
  host: '127.0.0.1',
  port: 3306,
  username: 'boltech',
  password: 'boltech',
  database: 'boltechDB',
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true,
};
export default config;
