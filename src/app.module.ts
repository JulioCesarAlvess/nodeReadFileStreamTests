import { Module } from '@nestjs/common';
import { AppController } from './inbound/app.controller';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { GenerateFiles } from './core/usecase/generate-files';
import { GeneratePdf } from './core/usecase/generate-pdf';
import { GenerateZip } from './core/usecase/generate-zip';

@Module({
  imports: [
    EventEmitterModule.forRoot({
      maxListeners: 0,
    }),
  ],
  controllers: [AppController],
  providers: [GenerateFiles, GeneratePdf, GenerateZip],
})
export class AppModule {}
