import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { User } from '@prisma/client';
import { diskStorage } from 'multer';

import { CreateUserDto } from './dto/users.dto';
import { UsersService } from './users.service';
import { edirFileName, imageFileFilter } from '../core/file-upload/file.upload';
import { configs } from '../core/configs';
import { PetsService } from '../pets/pets.service';
import { PetDto } from '../pets/dto/pet.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private readonly petsService: PetsService,
  ) {}

  @Get()
  async getUsersList(@Req() req: any, @Res() res: any) {
    return res.status(HttpStatus.OK).json(await this.userService.getUserList());
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination:
          // path.join('./public/users'),
          configs.PUBLIC_PICTURE_USERS,
        filename: edirFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async createUser(
    @Req() req: any,
    @Body() body: CreateUserDto,
    @Res() res: any,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<User> {
    if (file) {
      body.avatar = `path.join(configs.PUBLIC_PICTURE_USERS), ${file.filename})`;
    }
    return res
      .status(HttpStatus.CREATED)
      .json(await this.userService.createUser(body));
  }

  @ApiParam({ name: 'userId', required: true })
  @Get('/:userId')
  async getUserInfo(
    @Req() req: any,
    @Res() res: any,
    @Param('userId') userId: string,
  ): Promise<User> {
    return res
      .status(HttpStatus.OK)
      .json(await this.userService.getUserById(userId));
  }

  @ApiParam({ name: 'userId', required: true })
  @Patch('/:userId')
  async updateUser(
    @Req() req: any,
    @Res() res: any,
    @Param('userId') userId: string,
  ) {
    // return res
    //   .status(HttpStatus.OK)
    //   .json(await this.userService.updateOneUser(body));
  }

  @ApiParam({ name: 'userId', required: true })
  @Delete('/:userId')
  async deleteUser(
    @Req() req: any,
    @Res() res: any,
    @Param('userId') userId: string,
  ) {
    return res.statusCode(HttpStatus.OK);
    // .json(await this.userService.deleteUser(userId));
  }

  @Post('/animals/:userId')
  async addNewPets(
    @Req() req: any,
    @Res() res: any,
    @Body() body: PetDto,
    @Param('userId') userId: string,
  ) {
    const user = await this.userService.getUserById(userId);
    if (!user) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: `User with id: ${userId} is not found` });
    }
    return res
      .status(HttpStatus.OK)
      .json(await this.petsService.createAnimals(body, userId));
  }
}
