import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ProjectEntity } from 'src/entities/assignment/project.entity';
import { Project, ProjectUpdate } from 'src/models/project';
import { LoginUser } from 'src/models/user';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(ProjectEntity)
    private readonly em: EntityRepository<ProjectEntity>,
  ) {}

  async getProject(id: number, userId: number): Promise<Project> {
    const project = await this.em.findOne({ id: id, owner: userId });
    if (!project) {
      throw new HttpException('Project was not found.', HttpStatus.NOT_FOUND);
    }
    return project;
  }

  async create({ name }: Project, owner: number): Promise<Project | undefined> {
    const project = this.em.create(new ProjectEntity(name, owner));
    await this.em.flush();
    return project;
  }

  async delete({ id }: Project, owner: number): Promise<boolean> {
    const project = await this.em.findOne({ id, owner });
    if (!project) {
      throw new HttpException(
        'Project to delete not found.',
        HttpStatus.NOT_FOUND,
      );
    }
    await this.em.removeAndFlush(project);
    return true;
  }

  async patch(
    { name, id, newName }: ProjectUpdate,
    owner: number,
  ): Promise<Project> {
    const project = await this.em.findOne({ name, id, owner });
    if (!project) {
      throw new HttpException(
        'Project to update not found.',
        HttpStatus.NOT_FOUND,
      );
    }
    project.name = newName;
    await this.em.persistAndFlush(project);
    return project;
  }

  async getProjects(user: LoginUser) {
    const project = await this.em.find({ owner: user.id });
    if (!project) {
      throw new HttpException(
        'Project to delete not found.',
        HttpStatus.NOT_FOUND,
      );
    }
    return project;
  }
}
