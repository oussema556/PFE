import { DocumentController } from './document.controller';
import { DocumentService } from './document.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Module } from '@nestjs/common';
import { Document } from 'src/common/entities/document.entity';


@Module({
    imports: [TypeOrmModule.forFeature([Document])],
    controllers: [DocumentController],
    providers: [DocumentService],
    exports: [TypeOrmModule]
})
export class DocumentModule {}
