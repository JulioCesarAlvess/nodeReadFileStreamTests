import { createWriteStream, createReadStream, unlinkSync } from 'fs';
import * as archiver from 'archiver';
import { pdfFileName, zipFileName, csvFileName } from 'src/core/config/utils';
import { OnEvent } from '@nestjs/event-emitter';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class GenerateZip {
  private readonly logger = new Logger(GenerateZip.name);
  @OnEvent('create.zip')
  async on() {
    this.logger.log('iniciando geracao do zip');
    const output = createWriteStream(zipFileName);
    const archive = archiver('zip', {
      zlib: { level: 9 },
    });
    archive.append(createReadStream(csvFileName), { name: csvFileName });
    archive.append(createReadStream(pdfFileName), { name: pdfFileName });
    archive.pipe(output);
    await archive.finalize();
    //apagar os arquivos
    unlinkSync(csvFileName);
    unlinkSync(pdfFileName);

    this.logger.log('zip gerado');
  }
}
