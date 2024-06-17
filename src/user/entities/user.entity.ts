import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidv4 } from 'uuid';
import { AccountInfoEntity } from "./account_info.entity";


@Entity()
export class UserEntity{
    @PrimaryGeneratedColumn('uuid')
    id = uuidv4();

    @Column()
    name:string;

    @OneToMany(() => AccountInfoEntity, (info) => info.user, { cascade: true })
    accoutInfo: AccountInfoEntity[];

    toString(): string {
        return `UserEntity {
            id: ${this.id},
            name: ${this.name},
            accoutInfo: [${this.accoutInfo.map(info => info.toString()).join(', ')}]
        }`;
    }
    toJSON(): any {
        return {
            id: this.id,
            name: this.name
        };
    }
}

