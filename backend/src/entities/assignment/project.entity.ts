import {
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
  Unique,
} from '@mikro-orm/core';
import { UserEntity } from '../user/user.entity';
import { TaskEntity } from './task.entity';
@Entity()
export class ProjectEntity {
  @PrimaryKey()
  @Unique()
  id: number;

  @Property({ length: 32 })
  name: string;

  @ManyToOne(() => UserEntity)
  owner: number;

  @OneToMany('TaskEntity', 'project')
  tasks = new Collection<TaskEntity>(this);

  constructor(name: string, owner: number);
  constructor(name: string, owner: number, id: number);
  constructor(name?: string, owner?: number, id?: number) {
    this.name = name;
    this.owner = owner;
    this.id = id;
  }
}
