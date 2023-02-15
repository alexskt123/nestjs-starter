import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  host: process.env.DB_HOST || 'nestjs-starter.db',
  port: Number(process.env.DB_PORT) || 5432,
  name: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  isSsl: process.env.DB_IS_SSL === 'true',
  sslExtra: process.env.DB_SSL_EXTRA,
  sync: process.env.DB_SYNC === 'true',
}));
