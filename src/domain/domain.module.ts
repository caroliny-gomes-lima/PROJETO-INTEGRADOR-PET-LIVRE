import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientUser } from './models/users/Client.model';
import { ClientService } from './services/Clients.service';
import { InfrastructureModule } from 'src/infrastructure/infrastructure.module';
import { PetService } from './services/Pet.service';
import { Address } from './models/users/Address.Model';

@Module({
  imports: [
    InfrastructureModule,
    TypeOrmModule.forFeature([ClientUser, Address]),
  ],
  providers: [ClientService, PetService],
  exports: [ClientService, PetService],
})
export class DomainModule {}
