import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';

@Controller('api/contact')
export class ContactController {
    constructor(private service: ContactService) {}

    @Post()
    @HttpCode(200)
    async submit(@Body() dto: CreateContactDto) {
        await this.service.submit(dto);
        return { success: true };
    }
}
