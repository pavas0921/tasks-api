import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Task } from '@prisma/client';

@Injectable()
export class TasksRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: {
    title: string;
    description?: string;
    status?: string;
  }): Promise<Task> {
    return this.prisma.task.create({
      data,
    });
  }

  async findAll(): Promise<Task[]> {
    return this.prisma.task.findMany();
  }

  async findTaskById(id: number): Promise<Task | null> {
    return this.prisma.task.findUnique({
      where: { id },
    });
  }

  async updateTaskById(
    id: number,
    data: { title: string; description?: string; status?: string },
  ): Promise<Task> {
    return this.prisma.task.update({
      where: { id },
      data,
    });
  }

  async updateTaskStatusById(id: number, status: string): Promise<Task> {
    return this.prisma.task.update({
      where: { id },
      data: { status },
    });
  }

  async removeTaskById(id: number): Promise<Task> {
    return this.prisma.task.delete({
      where: { id },
    });
  }
}
