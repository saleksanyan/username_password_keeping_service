import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { AccountInfoEntity } from '../entities/account_info.entity';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity) 
        private readonly userRepository: Repository<UserEntity>,
        @InjectRepository(AccountInfoEntity)
        private readonly accountInfoRepository: Repository<AccountInfoEntity>
    ){}

    async create(createUserDto: CreateUserDto): Promise<UserEntity> {
        try {
            const user = new UserEntity();
            user.name = createUserDto.name;
            const accountInfo = new AccountInfoEntity();
            accountInfo.username = createUserDto.username;
            accountInfo.password = createUserDto.password;
            accountInfo.user = user;
            user.accoutInfo = [accountInfo];
            await this.userRepository.save(user);
            await this.accountInfoRepository.save(accountInfo);
            console.log("Created User:", user.toJSON());
            console.log("Created AccountInfo:", accountInfo.toJSON());
            return user; 
        } catch (error) {
            console.error("Error saving entities:", error);
            throw error; 
        }
    }

    async getAllUsernamesAndPasswords(userID: string): Promise<AccountInfoEntity[]>{
        try{
            const accountInfos = await this.accountInfoRepository
                .createQueryBuilder('accountInfo')
                .leftJoin('accountInfo.user', 'user')
                .where('user.id = :userID', { userID })
                .getMany();
            return accountInfos;
        }catch(error){
            throw error;
        }
    }

    async findOne(userID: string): Promise<UserEntity> {
		const options: FindOneOptions<UserEntity> = {
			where: { id: userID },
		};		
		return this.userRepository.findOne(options);
	}

    async changePassword(userID: string, username: string, newPassword: string): 
    Promise<AccountInfoEntity>{
        try{
            let accountInfos = await this.accountInfoRepository
                    .createQueryBuilder('accountInfo')
                    .leftJoin('accountInfo.user', 'user')
                    .where('user.id = :userID', { userID })
                    .getMany(); 

            let exactUser = accountInfos.filter((info) => {
                return info.username = username;
            }) 
            let resultedUser = exactUser[0];
            resultedUser.password = newPassword;
            await this.accountInfoRepository.save(resultedUser);            
            return resultedUser;
        }catch(error){
            throw error;
        }
    }


    async addUsernamePassword(userID: string, username: string, password: string): 
    Promise<AccountInfoEntity>{
       try{ let user = await this.findOne(userID);
            let accInfo = new AccountInfoEntity();
            accInfo.username = username;
            accInfo.password = password;
            accInfo.user = user;
            this.accountInfoRepository.save(accInfo);
            user.accoutInfo.push(accInfo);
            this.userRepository.save(user);
            return accInfo;
        }catch(error){
            throw error;
        }
    }

}
