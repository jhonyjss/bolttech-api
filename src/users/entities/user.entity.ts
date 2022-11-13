import { Task } from './../../task/entities/task.entity';
import { Project } from './../../project/entities/project.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  toJSON() {
    delete this.password;
    return this;
  }

  @BeforeInsert() async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  public updated_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  deleted_at: Date;

  @OneToMany(() => Project, (project) => project.users)
  projects: Project[];

  @OneToMany(() => Task, (tasks) => tasks.users)
  tasks: Task[];
}
