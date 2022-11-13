import { IsString, IsInt, IsDate, IsDateString } from 'class-validator';

export class CreateTaskDto {
  @IsInt()
  readonly project_id: number;

  @IsInt()
  readonly user_id: number;

  @IsDateString()
  readonly finish_at: Date;

  @IsString()
  readonly status: string;

  @IsString()
  readonly description: string;
}
