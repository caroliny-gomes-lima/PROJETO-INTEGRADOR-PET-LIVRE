import { Module } from '@nestjs/common';
import { DomainModule } from 'src/domain/domain.module';
import { ClientService } from 'src/domain/services/Clients.service';
import { InfrastructureModule } from 'src/infrastructure/infrastructure.module';

@Module({
  imports: [DomainModule, InfrastructureModule],
  controllers: [],
  providers: [ClientService],
  exports: [ClientService],
})
export class ApplicationModule {}
