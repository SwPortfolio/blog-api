import { IsNotEmpty, IsString, IsNumber, IsArray } from 'class-validator';

export class ContentRegister {
  @IsNotEmpty()
  @IsNumber()
  blogcategorypkey: number;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;
}
