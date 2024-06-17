import { Module } from '@nestjs/common';
import { UserController } from './user/controller/user.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { UserEntity } from './user/entities/user.entity';
import { UserService } from './user/service/user.service';
import { AccountInfoEntity } from './user/entities/account_info.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`,
    }),
    TypeOrmModule.forFeature([UserEntity, AccountInfoEntity]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [
        join(__dirname, './**/**/*.entity{.ts,.js}'), 
        join(__dirname, './user/entities/**/*{.ts,.js}'),
      ],
      
      synchronize: true,
      logging: true,
    }),
    
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class AppModule {}
