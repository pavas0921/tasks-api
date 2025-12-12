import { IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class GetTaskByIdDto {
  @Type(() => Number)
  @IsInt({ message: 'El id debe ser un número entero' })
  @Min(1, { message: 'El id debe ser un número positivo mayor que 0' })
  id: number;
}
