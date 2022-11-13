import { IsString, IsInt, IsOptional, IsDateString } from 'class-validator';

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

  @IsString()
  @IsOptional()
  readonly status: string;

  @IsString()
  readonly description: string;
}
