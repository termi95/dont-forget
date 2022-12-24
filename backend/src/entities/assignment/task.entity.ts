import {
  DateTimeType,
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

  @Property({ onCreate: () => new Date() })
  creationDate: DateTimeType;

  @Property({ nullable: true })
  FinishDate: DateTimeType;
}
