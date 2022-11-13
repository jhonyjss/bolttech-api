import { Task } from './../../task/entities/task.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Users } from 'src/users/entities/user.entity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'int' })
  user_id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  updated_at: Date;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  deleted_at: Date;

  @ManyToOne(() => Users, (users) => users.projects)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  users: Users[];

  @OneToMany(() => Task, (tasks) => tasks.projects)
  tasks: Task[];
}
