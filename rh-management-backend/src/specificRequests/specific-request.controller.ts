import { Controller } from '@nestjs/common';
import { SpecificRequestService } from './specific-request.service';

@Controller('specificRequests')
export class SpecificRequestController {
    constructor(private readonly specificRequestService : SpecificRequestService){}

    
}