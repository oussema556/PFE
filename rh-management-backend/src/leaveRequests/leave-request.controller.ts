import { UpdateLeaveRequestDto } from './dto/update-leave-request.dto';
import { CreateLeaveRequestDto } from './dto/create-leave-request.dto';
import { LeaveRequestService } from './leave-request.service';
import { Controller, Post, Body, Get, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';


@Controller('leaveRequests')
export class LeaveRequestController {
    constructor(private readonly leaveRequestService : LeaveRequestService){}

    @UseGuards(AuthGuard('jwt'))
    @Get('/:id')
    getByEmployeeId(@Param('id') id:number){
        return this.leaveRequestService.getByEmployeeId(id);
    }
    @UseGuards(AuthGuard('jwt'))
    @Post('')
    create(@Body() createLeaveRequest:CreateLeaveRequestDto){
        return this.leaveRequestService.create(createLeaveRequest);
    }
    @UseGuards(AuthGuard('jwt'))
    @Delete('/:id')
    delete(@Param('id') id:number){
        this.leaveRequestService.delete(id);
    }
    @UseGuards(AuthGuard('jwt'))
    @Patch('/:id')
    update(@Param('id') id : number,@Body() updateLeaveRequest :UpdateLeaveRequestDto){
        return this.leaveRequestService.update(id,updateLeaveRequest)
    }
}
