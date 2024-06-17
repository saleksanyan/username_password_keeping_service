import { Module } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountInfoEntity } from '../entities/account_info.entity';
import { UserService } from '../service/user.service';
import { UserController } from '../controller/user.controller';

@Module({imports: [
    TypeOrmModule.forFeature([UserEntity, AccountInfoEntity]),    
    ],
    controllers: [UserController],
	providers: [UserService],
	exports: [],

})
export class UserModule {}
