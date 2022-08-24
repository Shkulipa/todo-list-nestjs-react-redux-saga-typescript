import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsBoolean } from 'class-validator';
import { CreateTodoDto } from './create-todo.dto';

export class UpdateTodoDto extends PartialType(CreateTodoDto) {
  @IsNotEmpty()
  readonly title: string;

  @IsNotEmpty()
  @IsBoolean()
  readonly done: boolean;
}
