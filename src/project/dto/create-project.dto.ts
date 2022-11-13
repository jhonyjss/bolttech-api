import { IsString, IsInt } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  readonly description: string;

  @IsInt()
  readonly user_id: number;
}
