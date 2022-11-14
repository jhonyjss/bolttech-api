import { Project } from './../../project/entities/project.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
  BeforeInsert,
} from 'typeorm';
import { Users } from 'src/users/entities/user.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'longtext' })
  description: string;

  @Column({ type: 'int' })
  project_id: number;

  @Column({ type: 'int' })
  user_id: number;

  @Column()
  status: boolean;

  @BeforeInsert() async setstatus() {
    this.status = false;
  }

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'date', default: () => null })
  finish_at: Date;

  @Column({
    type: 'timestamp',
    nullable: true,
    default: null,
  })
  updated_at: Date;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  deleted_at: Date;

  toJSON() {
    delete this.projects;
    return this;
  }

  @ManyToOne(() => Users, (users) => users.tasks, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  users: Users[];

  @ManyToOne(() => Project, (project) => project.tasks, {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'project_id', referencedColumnName: 'id' })
  projects: Project[];
}
