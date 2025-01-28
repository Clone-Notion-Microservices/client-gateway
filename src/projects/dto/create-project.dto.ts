import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProjectDto {

  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  public description: string;
}