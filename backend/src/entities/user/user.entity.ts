import {
  AfterCreate,
  DateTimeType,
  Entity,
  EventArgs,
  PrimaryKey,
  Property,
  Unique,
} from '@mikro-orm/core';
import { ProjectEntity } from '../assignment/project.entity';

@Entity()
export class UserEntity {
  @PrimaryKey()
  @Unique()
  id: number;

  @Property({ length: 32 })
  username: string;

  @Property({ length: 64 })
  @Unique()
  email: string;

  @Property()
  password: string;

  @Property({ type: 'datetime', columnType: 'datetime', onCreate: () => new Date() })
  creationDate: Date;

  @Property({ type: 'datetime', columnType: 'datetime', nullable: true })
  lastLogin: Date;

  @Property({ type: 'datetime', columnType: 'datetime', nullable: true })
  passwordChangeDate: Date;

  @AfterCreate()
  async afterCreate<T>(args: EventArgs<T>): Promise<void> {
    args.em.nativeInsert(ProjectEntity, {
      owner: this.id,
      name: 'Default',
    });
  }

  constructor(username: string, email: string, password: string) {
    this.username = username;
    this.email = email;
    this.password = password;
  }
}
