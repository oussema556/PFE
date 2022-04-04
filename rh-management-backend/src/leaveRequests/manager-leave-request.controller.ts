import { LeaveRequestService } from './leave-request.service';
import { Controller, Get, Param, Patch, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';


@Controller('manager/leaveRequests')
export class ManagerLeaveRequestController {
    constructor(private readonly leaveRequestService : LeaveRequestService){}

    @UseGuards(AuthGuard('jwt'))
    @Get('/:managerId')
    getByManagerId(@Param('managerId') managerId :number,@Query('isValid') isValid : boolean){
        return this.leaveRequestService.getByManagerId(managerId,isValid);
    }
    @Get('')
    async fake(){
        await this.leaveRequestService.generateLeaveRequests();
        return await this.getByManagerId(5,true);
    }
    @Patch('/:id')
    validateLeaveRequest(@Param('id') id :number){
        return this.leaveRequestService.validateLeaveRequest(id);
    }
}