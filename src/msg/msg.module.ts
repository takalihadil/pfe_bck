import { Module } from '@nestjs/common';
import { MessagesService } from './msg.service';
import { MessagesController } from './msg.controller';
import { PrismaService } from '../prisma.service';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [MulterModule.register({ dest: './uploads' })],
  controllers: [MessagesController],
  providers: [MessagesService, PrismaService],
  exports: [MessagesService],
})
export class MessageModule {}