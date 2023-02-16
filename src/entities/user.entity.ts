import { Entity, Column, Index, BeforeInsert, OneToOne, JoinColumn } from 'typeorm';
import Model from './model.entity';
import bcrypt from 'bcryptjs';
import { Role } from './role.entity';

export enum RoleEnumType {
  SUPERADMIN = 'super-admin',
  ADMIN = 'admin',
  MANAGER = 'manager',
  AGENT = 'agent',
}

@Entity('users')
export class User extends Model {
  @Column()
  name: string;

  @Index('email_index')
  @Column({
    unique: true,
  })
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: RoleEnumType,
    default: RoleEnumType.AGENT,
  })
  role: RoleEnumType.AGENT;

  @Column({
    default: 'default.png',
  })
  photo: string;

  @Column({
    default: false,
  })
  verified: boolean;

  toJSON() {
    return { ...this, password: undefined, verified: undefined };
  }

  // Hash password before saving to database
  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 12);
  }

  // Validate password
  static async comparePasswords(
    candidatePassword: string,
    hashedPassword: string
  ) {
    return await bcrypt.compare(candidatePassword, hashedPassword);
  }
}