import { HttpException, HttpStatus } from '@nestjs/common';

export const edirFileName = (req, file, callback) => {
  const name = file.originalname.split('.')[0];
  const randomName = Array(8)
    .fill(0)
    .map(() => Math.round(Math.random() * 10).toString())
    .join('');
  callback(null, `${name}${randomName}`);
};

export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|png|jpeg|svg)$/)) {
    return callback(
      new HttpException('Only image file allowed', HttpStatus.BAD_REQUEST),
      false,
    );
  }
  callback(null, true);
};
