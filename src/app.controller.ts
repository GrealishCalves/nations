import { Body, Controller, Get, Post } from '@nestjs/common';
import { InvokeDataService, Nation } from './app.service';
@Controller()
export class NationController {
  constructor(private readonly invokeDataService: InvokeDataService) {}

  @Get()
  getNation(): Promise<Nation> {
    return this.invokeDataService.getNation();
  }

  @Post('/population')
  getPopulation(@Body() year: string): Promise<Nation> {
    return this.invokeDataService.getPopulation(year);
  }
}
