import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { BadRequestException } from '@nestjs/common';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'email', unique: true })
  email: string;

  @Column({ name: 'password' })
  @Exclude()
  password: string;

  @Column({ name: 'phone', nullable: true, unique: true })
  phone?: string;

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

  constructor(props: {
    name: string;
    email: string;
    password: string;
    phone?: string;
    isPrivate: boolean;
  }) {
    Object.assign(this, props);
  }

  changePassword(oldPassword: string, newPassword: string) {
    if (oldPassword !== this.password) {
      throw new BadRequestException({
        message: 'The old password is wrong.',
      });
    }

    if (newPassword === this.password) {
      throw new BadRequestException({
        message: 'The new password should be different',
      });
    }

    this.password = newPassword;
  }
}
