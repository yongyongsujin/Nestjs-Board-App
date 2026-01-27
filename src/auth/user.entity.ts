import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique, OneToMany } from 'typeorm';
import { Board } from 'src/boards/board.entity';

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    // eager: true 옵션을 주면 User를 조회할 때 관련된 Board들도 함께 조회됨
    @OneToMany(type => Board, board => board.user, { eager: true })
    boards: Board[];
}