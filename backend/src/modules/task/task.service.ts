import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ProjectEntity } from 'src/entities/assignment/project.entity';
import { TaskEntity } from 'src/entities/assignment/task.entity';
import { Task, TaskCreate, TaskUpdate } from 'src/models/task';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly em: EntityRepository<TaskEntity>,
    @InjectRepository(ProjectEntity)
    private readonly emProject: EntityRepository<ProjectEntity>,
  ) {}

  async getTask(id: number, userId: number): Promise<Task> {
    const task = await this.em.findOne({ id: id, createdByUser: userId });
    if (!task) {
      throw new HttpException('Task was not found.', HttpStatus.NOT_FOUND);
    }
    return task;
  }

  async create(
    { name, body, project }: TaskCreate,
    createdByUser: number,
  ): Promise<Task> {
    try {
      const task = new TaskEntity(
        name,
        body,
        createdByUser,
        await this.emProject.getReference(project),
      );
      await this.em.persistAndFlush(await this.em.create(task));
      return task;
    } catch (e) {
      throw new HttpException(
        'Faild to create task.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async delete({ name, id }: Task, owner: number): Promise<boolean> {
    const Task = await this.em.findOne({ name, id, createdByUser: owner });
    if (!Task) {
      throw new HttpException(
        'Task to delete not found.',
        HttpStatus.NOT_FOUND,
      );
    }
    await this.em.removeAndFlush(Task);
    return true;
  }

  async patch(
    { name, body, id, newName, newBody }: TaskUpdate,
    owner: number,
  ): Promise<Task> {
    const Task = await this.em.findOne({ name, id, createdByUser: owner });
    if (!Task) {
      throw new HttpException(
        'Task to update not found.',
        HttpStatus.NOT_FOUND,
      );
    }
    Task.name = newName !== '' ? newName : name;
    Task.body = newBody !== '' ? newBody : body;
    await this.em.persistAndFlush(Task);
    return Task;
  }

  async getTasks(id: number, userId: number): Promise<Task[]> {
    const tasks = await this.em.find({
      project: id,
      createdByUser: userId,
    });
    if (!tasks) {
      throw new HttpException('No task was found.', HttpStatus.NOT_FOUND);
    }

    return tasks;
  }
}
