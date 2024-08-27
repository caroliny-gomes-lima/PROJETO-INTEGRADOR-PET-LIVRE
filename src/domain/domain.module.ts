import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientUser } from './models/users/Client.model';
import { ClientService } from './services/Clients.service';
import { InfrastructureModule } from 'src/infrastructure/infrastructure.module';

@Module({
  imports: [InfrastructureModule, TypeOrmModule.forFeature([ClientUser])],
  providers: [ClientService],
  exports: [ClientService],
})
export class DomainModule {}
