import { IsNotEmpty, IsOptional, IsString, IsEnum } from 'class-validator';
import { TaskStatus  } from '../enums/taks-status.enum';

export class CreateTaskDto {
  @IsNotEmpty({ message: 'El título es obligatorio' })
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty({ message: 'El estado es obligatorio' })
  @IsEnum(TaskStatus, {
    message: `El estado debe ser uno de los siguientes valores: ${Object.values(TaskStatus).join(', ')}`,
  })
  status: TaskStatus;
}
