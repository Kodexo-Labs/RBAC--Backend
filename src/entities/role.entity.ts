import { Column, Entity } from 'typeorm';
import Model from './model.entity';

@Entity('Role')
export class Role extends Model {
    @Column({
        unique: true
    })
    name: string;

    @Column('text', {array: true})
    permissions: string[];

    @Column('text', {array: true, nullable: true})
    inherits: string[];
}
