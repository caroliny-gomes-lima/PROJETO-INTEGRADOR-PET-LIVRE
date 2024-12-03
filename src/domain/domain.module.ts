import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientUser } from './models/users/Client.model';
import { ClientService } from './services/Clients.service';
import { PetService } from './services/Pet.service';
import { Address } from './models/users/Address.Model';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';

@Module({
  imports: [
    InfrastructureModule,
    TypeOrmModule.forFeature([ClientUser, Address]),
  ],
  providers: [ClientService, PetService],
  exports: [ClientService, PetService],
})
export class DomainModule {}
