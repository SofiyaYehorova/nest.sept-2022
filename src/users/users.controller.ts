import {Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Req, Res} from '@nestjs/common';
import {ApiParam, ApiTags} from "@nestjs/swagger";

import {CreateUserDto} from "./dto/users.dto";
import {UsersService} from "./users.service";

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(
        private readonly userService: UsersService
    ) {

    }

    @Get()
    async getUsersList(@Req() req: any, @Res() res: any) {
        // return res.status(HttpStatus.OK).json(await this.userService.getUserList())
    }

    @Post()
    async createUser(
        @Req() req: any,
        @Body() body: CreateUserDto,
        @Res() res: any,
    ) {
        // const user = await this.userService.createUser(body);
        // return user;

        return res.status(HttpStatus.CREATED).json(await this.userService.createUser(body))
    }

    @ApiParam({name: 'userId', required: true})
    @Patch('/:userId')
    async updateUser(@Req() req: any, @Res() res: any, @Param('userId') userId: string) {
    }

    @Delete('/:userId')
    async deleteUser(@Req() req: any, @Res() res: any, @Param('userId') userId: string) {
        return res.statusCode(HttpStatus.OK).json(await this.userService.deleteUser(userId))
    }
}
