import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SpecificRequest } from 'src/common/entities/specific-request.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SpecificRequestService {
    
    constructor(
        @InjectRepository(SpecificRequest)
        private readonly specificRequestRepository: Repository<SpecificRequest>,) { }


}
