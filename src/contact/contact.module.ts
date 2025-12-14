import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';
import { ContactProcessor } from './contact.processor';
import { PrismaService } from '../prisma/prisma.service';

@Module({
    imports: [
        BullModule.registerQueue({
            name: 'email-queue',
        }),
    ],
    controllers: [ContactController],
    providers: [
        ContactService,
        ContactProcessor,
        PrismaService,
    ],
})
export class ContactModule {}
