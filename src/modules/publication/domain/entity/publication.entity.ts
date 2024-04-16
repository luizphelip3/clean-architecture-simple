import { User } from '@modules/user/domain';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Publication {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'description' })
  description: string;

  @Column({ name: 'is_private', default: false })
  isPrivate: boolean;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt?: Date;

  @ManyToOne(() => User, (user) => user.publication)
  user: User;

  constructor(props: { description: string; isPrivate: boolean; user: User }) {
    Object.assign(this, props);
  }
}
