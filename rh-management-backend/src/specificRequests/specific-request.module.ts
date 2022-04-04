import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { SpecificRequestController } from './specific-request.controller';
import { SpecificRequestService } from './specific-request.service';
import { SpecificRequest } from 'src/common/entities/specific-request.entity';


@Module({
    imports: [TypeOrmModule.forFeature([SpecificRequest])],
    controllers: [SpecificRequestController],
    providers: [SpecificRequestService],
    exports: [TypeOrmModule]
})
export class SpecificRequestModule {}
