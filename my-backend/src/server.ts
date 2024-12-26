import app from './app';
import { ENV } from './config/env';
import logger from './config/logger';

app.listen(ENV.PORT, () => {
  logger.info(`Server running in ${ENV.NODE_ENV} mode on port ${ENV.PORT}`);
});
