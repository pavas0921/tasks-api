import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task-dto';
import { GetTaskByIdDto } from './dto/get-taskById-dto';
import { TasksRepository } from './tasks.repository';
import { Task } from '@prisma/client'; // modelo generado por Prisma
import { UpdateTaskStatusDto } from './dto/update-status-dto';

@Injectable()
export class TasksService {
  constructor(private readonly tasksRepository: TasksRepository) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description, status } = createTaskDto;

    const newTask = await this.tasksRepository.create({
      title,
      description,
      status: status || 'pendiente', // valor por defecto si no envían status
    });
    return newTask;
  }

  async getAllTasks(): Promise<Task[]> {
    return this.tasksRepository.findAll();
  }

  async getTaskById(getTaskByIdDto: GetTaskByIdDto): Promise<Task | null> {
    const task = await this.tasksRepository.findTaskById(getTaskByIdDto.id);
    if (!task) {
      throw new NotFoundException('Tarea no encontrada');
    }
    return task;
  }

  async updateTaskById(
    getTaskByIdDto: GetTaskByIdDto,
    updateTaskDto: CreateTaskDto,
  ): Promise<Task> {
    const { id } = getTaskByIdDto;
    const { title, description, status } = updateTaskDto;

    await this.getTaskById(getTaskByIdDto);

    const updatedTask = await this.tasksRepository.updateTaskById(id, {
      title,
      description,
      status,
    });
    return updatedTask;
  }

  async updateTaskStatusById(
    getTaskByIdDto: GetTaskByIdDto,
    updateTaskDto: UpdateTaskStatusDto,
  ): Promise<Task> {
    const { id } = getTaskByIdDto;
    const { status } = updateTaskDto;

    await this.getTaskById(getTaskByIdDto);

    const updatedTask = await this.tasksRepository.updateTaskStatusById(
      id,
      status,
    );
    return updatedTask;
  }

  async deleteTaskById(getTaskByIdDto: GetTaskByIdDto): Promise<Task> {
    const { id } = getTaskByIdDto;
    await this.getTaskById(getTaskByIdDto);
    const deletedTask = await this.tasksRepository.removeTaskById(id);
    return deletedTask;
  }
}
