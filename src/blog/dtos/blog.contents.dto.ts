import { IsNotEmpty, IsString, IsNumber, IsArray } from 'class-validator';

export class ContentRegisterDto {
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

export class GetContentDto {
  @IsNotEmpty()
  @IsString()
  ccode: string;
}
