import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationModule } from 'src/app/aplication.module';
import { ClientUser } from 'src/domain/models/users/Client.model';
import { ClientController } from './adapters/controllers/client.controller';
import { ClienteRpositoryImpl } from './adapters/database/Client.repository.implements';

@Module({
  imports: [
    forwardRef(() => ApplicationModule),
    TypeOrmModule.forFeature([ClientUser]),
  ],
  controllers: [ClientController],
  providers: [
    ClienteRpositoryImpl,
    { provide: 'ClientInterface', useClass: ClienteRpositoryImpl },
  ],
  exports: [ClienteRpositoryImpl, 'ClientInterface'],
})
export class InfrastructureModule {}
