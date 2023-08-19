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
  async getPopulation(@Body() year: string): Promise<Nation> {
    const result = await this.invokeDataService.getPopulation(year);
    return result;
  }
}
