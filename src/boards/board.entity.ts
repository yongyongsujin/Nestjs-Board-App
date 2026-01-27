import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BoardStatus } from "./board-status.enum";
import { User } from "src/auth/user.entity";

@Entity()
export class Board extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    status: BoardStatus;

    // eager: false 옵션을 주면 Board를 조회할 때 관련된 User는 함께 조회되지 않음
    @ManyToOne(type => User, user => user.boards, { eager: false })
    user: User;
}