import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoEntity } from './entities/todo.entity';

@Injectable()
export class TodosService {
  constructor(
    @InjectModel(TodoEntity) private readonly todoModel: typeof TodoEntity,
  ) {}

  async create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
    const todo = new TodoEntity();

    todo.title = createTodoDto.title;
    todo.done = createTodoDto.done;

    return await todo.save();
  }

  async findAll(): Promise<TodoEntity[]> {
    return await this.todoModel.findAll();
  }

  async findOne(id: string): Promise<TodoEntity> {
    return await this.todoModel.findOne({
      where: {
        id,
      },
    });
  }

  async update(
    id: string,
    updateTodoDto: UpdateTodoDto,
  ): Promise<[affectedCount: number, affectedRows: TodoEntity[]]> {
    return await this.todoModel.update(
      { ...updateTodoDto },
      {
        where: {
          id,
        },
        returning: true,
      },
    );
  }

  async remove(id: string): Promise<void> {
    const todo = await this.findOne(id);
    await todo.destroy();
  }
}
