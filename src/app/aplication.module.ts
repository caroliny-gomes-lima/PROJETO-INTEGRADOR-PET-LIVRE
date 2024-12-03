import { Module } from '@nestjs/common';
import { DomainModule } from '../domain/domain.module';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';
import { ClientService } from '../domain/services/Clients.service';
import { PetService } from '../domain/services/Pet.service';

@Module({
  imports: [DomainModule, InfrastructureModule],
  controllers: [],
  providers: [ClientService, PetService],
  exports: [ClientService, PetService],
})
export class ApplicationModule {}
