import { IsNotEmpty, IsString, IsNumber, IsArray } from 'class-validator';

export class RegisterBlogDto {
  @IsNotEmpty()
  @IsString()
  blogname: string;

  @IsArray()
  @IsString({ each: true }) // 모든 배열 항목이 문자열인지 확인
  categoryList: string[];
}

export class GetBlogDto {
  @IsNotEmpty()
  @IsNumber()
  blogpkey: number;
}
