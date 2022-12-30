import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ProjectEntity } from 'src/entities/assignment/project.entity';
import { TaskEntity } from 'src/entities/assignment/Task.entity';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';

@Module({
  imports: [
    MikroOrmModule.forFeature({ entities: [TaskEntity, ProjectEntity] }),
  ],
  controllers: [TaskController],
  providers: [TaskService],
  exports: [TaskService],
})
export class TaskModule {}
