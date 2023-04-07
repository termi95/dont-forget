import {
  Entity,
  ManyToOne,
  PrimaryKey,
  Property,
  Unique,
} from '@mikro-orm/core';
import { ProjectEntity } from './project.entity';

@Entity()
export class TaskEntity {
  @PrimaryKey()
  @Unique()
  id: number;

  @Property({ length: 32 })
  name: string;

  @Property({ length: 32 })
  body: string;

  @Property({ onCreate: () => false })
  done: boolean;

  @ManyToOne({ onDelete: 'cascade' })
  project: ProjectEntity;

  @Property()
  createdByUser: number;

  @Property({
    type: 'datetime',
    columnType: 'timestamp',
    onCreate: () => new Date(),
  })
  creationDate: Date;

  @Property({ type: 'datetime', columnType: 'timestamp', nullable: true })
  finishDate: Date;

  constructor(
    name: string,
    body: string,
    createdByUser: number,
    project: ProjectEntity,
  ) {
    this.name = name;
    this.body = body;
    this.createdByUser = createdByUser;
    this.project = project;
  }
}
