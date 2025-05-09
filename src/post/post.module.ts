// src/post/post.module.ts
import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PrismaService } from '../prisma.service'; 

@Module({
  controllers: [PostController],
  providers: [PostService, PrismaService], 
})
export class PostModule {}