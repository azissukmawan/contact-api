import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';
import { PrismaService } from '../prisma/prisma.service';
import { CreateContactDto } from './dto/create-contact.dto';

@Injectable()
export class ContactService {
    constructor(
        private prisma: PrismaService,
        @InjectQueue('email-queue')
        private queue: Queue,
    ) {}

    async submit(dto: CreateContactDto) {
        const contact = await this.prisma.contact.create({
            data: dto,
        });

        await this.queue.add('send-email', contact);

        return contact;
    }
}
