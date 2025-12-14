import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { BullModule } from '@nestjs/bullmq';
import { ContactModule } from './contact/contact.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        ThrottlerModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (c: ConfigService) => ({
                throttlers: [{
                    ttl: c.get('THROTTLE_TTL'),
                    limit: c.get('THROTTLE_LIMIT'),
                }],
            }),
        }),
        BullModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (c: ConfigService) => ({
                connection: {
                    host: c.get('REDIS_HOST'),
                    port: c.get('REDIS_PORT'),
                },
            }),
        }),
        ContactModule,
    ],
})
export class AppModule {}
