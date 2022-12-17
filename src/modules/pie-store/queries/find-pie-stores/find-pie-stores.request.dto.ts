import {
  MaxLength,
  IsString,
  IsAlphanumeric,
  Matches,
  IsOptional,
} from 'class-validator';

export class FindPieStoresRequestDto {
  @IsOptional()
  @MaxLength(50)
  @IsString()
  @Matches(/^[a-zA-Z ]*$/)
  readonly country?: string;

  @IsOptional()
  @MaxLength(10)
  @IsAlphanumeric()
  readonly postalCode?: string;

  @IsOptional()
  @MaxLength(50)
  @Matches(/^[a-zA-Z ]*$/)
  readonly street?: string;
}