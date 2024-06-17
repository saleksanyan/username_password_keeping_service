import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidv4 } from 'uuid';
import { UserEntity } from "./user.entity";

@Entity()
export class AccountInfoEntity{
    @PrimaryGeneratedColumn('uuid')
    id = uuidv4()

    @Column({unique: true})
    username:string;

    @Column()
    password:string;

    @ManyToOne(() => UserEntity, (user) => user.accoutInfo)
    user: UserEntity;
    
    toString(): string {
        return `AccountInfoEntity {
            id: ${this.id},
            username: ${this.username}
        }`;
    }
    toJSON(): any {
        return {
            username: this.username,
            password: this.password,
        };
    }
}