import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class RegisterBlogDto {
  @IsNotEmpty()
  @IsString()
  blogname: string;
}

export class GetBlogDto {
  @IsNotEmpty()
  @IsNumber()
  blogpkey: number;
}
