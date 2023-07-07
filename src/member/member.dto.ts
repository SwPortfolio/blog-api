import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsEmail,
  Length,
} from 'class-validator';

export class GetMemberDto {
  @IsNumber()
  @IsNotEmpty()
  memberpkey: number;
}

export class SignUpMemberDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  memberemail: string;

  @IsString()
  @IsNotEmpty()
  memberpwd: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 15)
  nickname: string;
}
