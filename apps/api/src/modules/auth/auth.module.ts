import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service.js';
import { UserEntity } from '../../entities/user.entity';
import { ClientEntity } from '../../entities/client.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, ClientEntity])],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
