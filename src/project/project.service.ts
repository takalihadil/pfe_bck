import { Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ProjectDto } from './dto/project.dto'; 


@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, data: ProjectDto) {
    if (!userId) {
      throw new Error("User ID is missing in request.");
    }
  
    
    const user = await this.prisma.user.findUnique({
      where: { id_users: userId }, 
    });
  
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found.`);
    }
  
    
    return this.prisma.project.create({
      data: {
        name: data.name,
        description: data.description,
        userId: user.id, 
      },
    });
  }
  
  

  async findAll() {
    return this.prisma.project.findMany();
  }



  async findOne(id: string) {
    const project = await this.prisma.project.findUnique({
      where: { id },
      include: { tasks: true }, 
    });

    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    return project;
  }

  async update(id: string, projectDto: ProjectDto) {
    const project = await this.prisma.project.findUnique({ where: { id } });

    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    return this.prisma.project.update({
      where: { id },
      data: {
        name: projectDto.name,
        description: projectDto.description,
      },
    });
  }

  

  async remove(id: string) {
    const project = await this.prisma.project.findUnique({ where: { id } });

    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    return this.prisma.project.delete({ where: { id } });
  }
}
