import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './users/users.module';
import { ProjectModule } from './project/project.module';
import { TaskModule } from './task/task.module';
import { TransactionModule } from './transaction/transaction.module';
import { HabitModule } from './habit/habit.module';
import { YoutubeModule } from './youtub/youtube.module';
import { PostModule } from './post/post.module';
import { ReactionModule } from './reaction/reaction.module';
import { CommentModule } from './comment/comment.module';
import { MessageModule } from './msg/msg.module';
import { ChatModule } from './chat/chat.module';
import { SupabaseModule } from './supabase/supabase.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Make the configuration global
      envFilePath: '.env', // Specify the path to your .env file
    }),
    AuthModule,
    ProjectModule,
    TaskModule,
    TransactionModule,
    HabitModule,
    YoutubeModule,
    PostModule,
    ReactionModule,
    CommentModule,
    MessageModule,
    ChatModule,
    SupabaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}