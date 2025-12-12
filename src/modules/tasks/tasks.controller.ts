import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Patch,
  Delete,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task-dto';
import { GetTaskByIdDto } from './dto/get-taskById-dto';
import { UpdateTaskStatusDto } from './dto/update-status-dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto) {
    const task = await this.tasksService.create(createTaskDto);
    console.log(task);

    return { message: 'Task created successfully', data: task };
  }

  @Get()
  async findAll() {
    const tasks = await this.tasksService.getAllTasks();
    return { data: tasks };
  }

  @Get(':id')
  async findOne(@Param() getTaskByIdDto: GetTaskByIdDto) {
    const task = await this.tasksService.getTaskById(getTaskByIdDto);
    return { data: task };
  }

  @Put(':id')
  async updateTask(
    @Param() getTaskByIdDto: GetTaskByIdDto,
    @Body() updateTaskDto: CreateTaskDto,
  ) {
    const updatedTask = await this.tasksService.updateTaskById(
      getTaskByIdDto,
      updateTaskDto,
    );
    return { message: 'Task updated successfully', data: updatedTask };
  }

  @Patch(':id')
  async updateStatusById(
    @Param() getTaskByIdDto: GetTaskByIdDto,
    @Body() updateTaskDto: UpdateTaskStatusDto,
  ) {
    const newTask = await this.tasksService.updateTaskStatusById(
      getTaskByIdDto,
      updateTaskDto,
    );
    return { message: 'Estado actualizado exitosamente', data: newTask };
  }

  @Delete(':id')
  async deleteTask(@Param() getTaskByIdDto: GetTaskByIdDto) {
    const deletedTask = await this.tasksService.deleteTaskById(getTaskByIdDto);
    return { message: 'Tarea eliminada exitosamente', data: deletedTask };
  }
}
