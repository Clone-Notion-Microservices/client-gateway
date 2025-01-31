import { Module } from '@nestjs/common';
import { ProjectsModule } from './projects/projects.module';
import { TasksModule } from './common/tasks.module';

@Module({
  imports: [ProjectsModule, TasksModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
