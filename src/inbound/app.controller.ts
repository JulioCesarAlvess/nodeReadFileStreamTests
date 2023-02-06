import { Controller, Get } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Controller()
export class AppController {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  @Get('/zip')
  getZip(): string {
    this.eventEmitter.emit('create.files');
    return 'teste';
  }
}
