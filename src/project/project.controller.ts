import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, Req } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectDto } from './dto/project.dto'; 
import { JwtAuthGuard } from '../users/jwt-auth.guard';
import { Request } from 'express';

@Controller('projects')
@UseGuards(JwtAuthGuard) 
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  create(@Req() req: Request & { user: { id_users: string } }, @Body() projectDto: ProjectDto) {
    const userId = req.user.id_users;
    return this.projectService.create(userId, projectDto);
  }
  

  @Get()
  findAll() {
    return this.projectService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() projectDto: ProjectDto) {
    return this.projectService.update(id, projectDto);
  }
  

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectService.remove(id);
  }
}
