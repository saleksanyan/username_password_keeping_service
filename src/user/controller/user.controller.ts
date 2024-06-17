import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';
import { UserService } from '../service/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { AccountInfoEntity } from '../entities/account_info.entity';

@Controller('user')
export class UserController{

    constructor(private readonly userService: UserService){}

    @Post('newUser')
	async create(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
        console.log("THIS IS DTO "+ createUserDto);
		return this.userService.create(createUserDto);
	}

    @Get(':userID')
    async getAllUsernamesWithPasswords(@Param('userID') userID: string): 
    Promise<AccountInfoEntity[]>{
        return this.userService.getAllUsernamesAndPasswords(userID);
    }

    @Patch(':userID/:username/:newPassword')
    async changePassword(@Param('userID') userID: string, @Param('username') username: string, 
    @Param('newPassword') pass: string): Promise<AccountInfoEntity>{
        return this.userService.changePassword(userID,username,pass);       
    }


    @Patch(':userID/:username/:newPassword')
    async addUsernamePassword(@Param('userID') userID: string, @Param('username') username: string, 
    @Param('newPassword') pass: string): Promise<AccountInfoEntity>{
        return this.userService.addUsernamePassword(userID,username,pass); 
    }

}
