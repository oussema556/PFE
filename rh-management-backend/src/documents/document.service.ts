import { Injectable } from '@nestjs/common';
import { ILike, Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Document } from 'src/common/entities/document.entity';


@Injectable()
export class DocumentService {
    
    constructor(
        @InjectRepository(Document)
        private readonly documentRepository: Repository<Document>,) { }



    
}
