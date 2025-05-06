// src/task/task.controller.ts

import { Controller, Post, Body, Param, Get, Put, Delete, UseGuards } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/task.dto';
import { JwtAuthGuard } from '../users/jwt-auth.guard';

@Controller('projects/:projectId/tasks')
@UseGuards(JwtAuthGuard)  
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()

  async createTask(
    @Param('projectId') projectId: string,
    @Body() createTaskDto: CreateTaskDto,
  ) {
    return this.taskService.create(projectId, createTaskDto);
  }

  @Get()
  async getTasksByProject(@Param('projectId') projectId: string) {
    return this.taskService.getTasksByProject(projectId);
  }

  
  @Get(':taskId')
  async getTaskById(@Param('taskId') taskId: string) {
    return this.taskService.getTaskById(taskId);
  }


  @Put(':taskId')
  async updateTask(
    @Param('taskId') taskId: string,
    @Body() updateTaskDto: CreateTaskDto,
  ) {
    return this.taskService.updateTask(taskId, updateTaskDto);
  }

  @Delete(':taskId')
  async deleteTask(@Param('taskId') taskId: string) {
    return this.taskService.deleteTask(taskId);
  }
}
