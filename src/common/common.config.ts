import 'dotenv/config';

export default () => ({
  PRODUCT_NAME: process.env.PRODUCT_NAME || 'nestjs-starter',
  PRODUCT_VERSION: process.env.PRODUCT_VERSION || -1,
  PRODUCT_SERVICE_NAME: process.env.PRODUCT_SERVICE_NAME || 'service-name',
  IS_LOCAL: process.env.IS_LOCAL === 'true',
  SEED: process.env.SEED === 'true',
  PORT: process.env.PORT as string,
});
