import { Module } from '@nestjs/common';
import { AuthModule } from './users/users.module';

@Module({
  imports: [AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
