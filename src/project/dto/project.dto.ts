import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class ProjectDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;
}
