import { Controller, Post, Body, Get, Param, Patch, Delete, DefaultValuePipe, ParseIntPipe, Query, UseGuards, Req } from '@nestjs/common';
import { DocumentService } from './document.service';


@Controller('documents')
export class DocumentController {
    constructor(private readonly documentService : DocumentService){}

}