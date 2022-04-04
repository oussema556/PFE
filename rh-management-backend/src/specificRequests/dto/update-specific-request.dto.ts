import { PartialType } from '@nestjs/mapped-types';
import { CreateSpecificRequestDto } from './create-specific-request.dto';

export class UpdateSpecificRequestDto extends PartialType(CreateSpecificRequestDto){}