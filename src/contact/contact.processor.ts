import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import * as fs from 'fs';
import * as Handlebars from 'handlebars';

@Processor('email-queue')
export class ContactProcessor extends WorkerHost {
    async process(job: Job) {
        const template = fs.readFileSync(
            'src/templates/contact.hbs',
            'utf8',
        );

        const compile = Handlebars.compile(template);
        const emailContent = compile(job.data);

        console.log('EMAIL TEMPLATE RESULT');
        console.log(emailContent);

        return true;
    }
}
