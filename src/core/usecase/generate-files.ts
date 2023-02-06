import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { stringify } from 'csv-stringify';
import { createWriteStream } from 'fs';
import { csvFileName } from 'src/core/config/utils';
import { ReadableStream, transform } from 'src/outbound/Stream';
import { Transform } from 'stream';

@Injectable()
export class GenerateFiles {
  private readonly logger = new Logger(GenerateFiles.name);

  constructor(private eventEmitter: EventEmitter2) {}

  @OnEvent('create.files')
  async on() {
    this.logger.log('gerando arquivos');

    new ReadableStream()
      .pipe(stringify())
      .pipe(new Transform({ transform }))
      .pipe(createWriteStream(csvFileName))
      .on('finish', () => {
        this.eventEmitter.emit('create.pdf');
      });
    this.logger.log('arquivos gerados');
  }
}
