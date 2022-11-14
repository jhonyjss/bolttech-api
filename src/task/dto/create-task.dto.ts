import {
  IsString,
  IsInt,
  IsOptional,
  IsDateString,
  IsBoolean,
} from 'class-validator';

export class CreateTaskDto {
  @IsInt()
  @IsOptional()
  readonly project_id: number;

  @IsInt()
  @IsOptional()
  readonly user_id: number;

  @IsDateString()
  @IsOptional()
  readonly finish_at: Date;

  @IsBoolean()
  @IsOptional()
  readonly status: boolean;

  @IsString()
  @IsOptional()
  description: string;
}
