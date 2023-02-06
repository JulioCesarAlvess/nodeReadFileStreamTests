import { createWriteStream, unlinkSync } from 'fs';
import { htmlName, htmlTxtName, pdfFileName } from '../config/utils';
import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { CreateHtml } from '../service/create-html';
import { createPdf } from '../service/create-pdf';

@Injectable()
export class GeneratePdf {
  private readonly logger = new Logger(GeneratePdf.name);
  constructor(private eventEmitter: EventEmitter2) {}

  @OnEvent('create.pdf')
  async on() {
    this.logger.log('criando a stream com o csv');

    this.logger.log('iniciando geracao do html');
    await new CreateHtml().create();
    this.logger.log('html gerado');
    this.logger.log('iniciando geracao do pdf');
    const { pdfStream, page } = await createPdf();

    pdfStream.pipe(createWriteStream(pdfFileName)).on('finish', async () => {
      await page.close();
      this.logger.log('pdf gerado');
      this.eventEmitter.emit('create.zip');
    });

    unlinkSync(htmlTxtName);
    unlinkSync(htmlName);
  }
}
