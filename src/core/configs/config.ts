import { config } from 'dotenv';
import * as process from 'process';

config();

export const configs = {
  PUBLIC_PICTURE_USERS: process.env.PUBLIC_PICTURE_USERS,
  PUBLIC_PICTURE_ANIMALS: process.env.PUBLIC_PICTURE_ANIMALS,
  BASE_URL: process.env.BASE_URL,
};
