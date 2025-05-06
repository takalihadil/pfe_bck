import { Module } from '@nestjs/common';
import { ReactionController } from './reaction.controller';
import { ReactionService } from './reaction.service';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [ReactionController],
  providers: [ReactionService, PrismaService],
})
export class ReactionModule {}