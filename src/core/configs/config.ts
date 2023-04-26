import { config } from 'dotenv';

config();

export const configs = {
  PUBLIC_PICTURE_USERS: process.env.PUBLIC_PICTURE_USERS,
};
