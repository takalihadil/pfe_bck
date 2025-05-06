

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateTaskDto } from './dto/task.dto';


@Injectable()
export class TaskService {
  constructor(private readonly prisma: PrismaService) {}

  
  async create(projectId: string, createTaskDto: CreateTaskDto) {
    const project = await this.prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!project) {
      throw new NotFoundException(`Project with ID ${projectId} not found.`);
    }

    return this.prisma.task.create({
      data: {
        title: createTaskDto.title,
        description: createTaskDto.description,
        status: createTaskDto.status || 'pending',
        estimatedHours: createTaskDto.estimatedHours,
        projectId: projectId,
      },
    });
  }

  
  async getTasksByProject(projectId: string) {
    const tasks = await this.prisma.task.findMany({
      where: { projectId },
    });

    if (tasks.length === 0) {
      throw new NotFoundException(`No tasks found for project with ID ${projectId}`);
    }

    return tasks;
  }

  
  async getTaskById(taskId: string) {
    const task = await this.prisma.task.findUnique({
      where: { id: taskId },
    });

    if (!task) {
      throw new NotFoundException(`Task with ID ${taskId} not found.`);
    }

    return task;
  }

  
  async updateTask(taskId: string, updateTaskDto: CreateTaskDto) {
    const task = await this.prisma.task.update({
      where: { id: taskId },
      data: updateTaskDto,
    });

    if (!task) {
      throw new NotFoundException(`Task with ID ${taskId} not found.`);
    }

    return task;
  }

 
  async deleteTask(taskId: string) {
    const task = await this.prisma.task.delete({
      where: { id: taskId },
    });

    if (!task) {
      throw new NotFoundException(`Task with ID ${taskId} not found.`);
    }

    return { message: `Task with ID ${taskId} deleted successfully` };
  }
}
