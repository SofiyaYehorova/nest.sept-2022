import {IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({required: true, example: 'Sofiya'})
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({required: false, example: 20})
    @IsNumber()
    @IsOptional()
    age: number;

    @ApiProperty({required: true, example: 'sofiya@gmail.com'})
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({required: false, example: 'Lviv'})
    @IsString()
    city: string;

    @ApiProperty()
    @IsBoolean()
    @IsOptional()
    status: boolean;
}