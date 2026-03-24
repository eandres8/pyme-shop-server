import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    EventEmitterModule.forRoot({
      wildcard: true,
      delimiter: '.',
      maxListeners: 10,
    }),
    HttpModule,
  ],
  exports: [EventEmitterModule, HttpModule],
})
export class SharedModule {}
