import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ContactModule } from './contact/contact.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        ThrottlerModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (c: ConfigService) => ({
                throttlers: [{
                    ttl: parseInt(c.get('THROTTLE_TTL') || '60', 10) * 1000,
                    limit: parseInt(c.get('THROTTLE_LIMIT') || '5', 10),
                }],
            }),
        }),
        BullModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (c: ConfigService) => ({
                connection: {
                    host: c.get('REDIS_HOST'),
                    port: parseInt(c.get('REDIS_PORT') || '6379', 10),
                    username: c.get('REDIS_USERNAME'),
                    password: c.get('REDIS_PASSWORD'),
                },
            }),
        }),
        ContactModule,
    ],
    providers: [
        {
            provide: APP_GUARD,
            useClass: ThrottlerGuard,
        },
    ],
})
export class AppModule {}
