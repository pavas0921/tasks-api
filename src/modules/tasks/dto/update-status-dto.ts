import { IsNotEmpty, IsEnum } from 'class-validator';
import { TaskStatus } from '../enums/taks-status.enum';

export class UpdateTaskStatusDto {
  @IsNotEmpty({ message: 'El estado es obligatorio' })
  @IsEnum(TaskStatus, {
    message: `El estado debe ser uno de los siguientes valores: ${Object.values(TaskStatus).join(', ')}`,
  })
  status: TaskStatus;
}
