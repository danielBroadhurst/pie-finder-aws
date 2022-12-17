import {
  IsAlphanumeric,
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreatePieStoreRequestDto {
  @MaxLength(320)
  @MinLength(5)
  @IsEmail()
  readonly pieStoreSlug!: string;

  @MaxLength(320)
  @MinLength(5)
  @IsEmail()
  readonly storeName!: string;

  @MaxLength(50)
  @MinLength(4)
  @IsString()
  @Matches(/^[a-zA-Z ]*$/)
  readonly country!: string;

  @MaxLength(10)
  @MinLength(4)
  @IsAlphanumeric()
  readonly postalCode!: string;

  @MaxLength(50)
  @MinLength(5)
  @Matches(/^[a-zA-Z ]*$/)
  readonly street!: string;
}