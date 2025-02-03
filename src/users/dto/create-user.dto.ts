import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateUserDto {
  @IsString()
  @MinLength(1)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  @IsOptional()
  @Transform(({ value }) => value.trim())
  password: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @IsIn(['team_member', 'admin'])
  public role?: string;

  @IsBoolean()
  @IsOptional()
  public available?: boolean;

  @IsArray()
  @IsOptional()
  public projects_permission?: [];

  @IsArray()
  @IsOptional()
  public tasks_permission?: [];
}
