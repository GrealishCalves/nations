import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { Span } from '@metinseylan/nestjs-opentelemetry';

export type Nation = {
  data: data[];
  source: Array<any>;
};

export type data = {
  Nation: string;
  year: string;
  Population: number;
};

@Injectable()
export class InvokeDataService {
  constructor(
    private readonly httpService: HttpService,
    private readonly logger: Logger,
  ) {}

  @Span()
  public async getNation(): Promise<Nation> {
    const response = await lastValueFrom(
      this.httpService.get<Nation>(
        'https://datausa.io/api/data?drilldowns=Nation&measures=Population',
      ),
    );
    this.logger.log(response.data);
    return response.data;
  }
  @Span()
  public async getPopulation(obj: any): Promise<Nation> {
    const response = await lastValueFrom(
      this.httpService.post<Nation>('http://localhost:3001/population', obj),
    );
    this.logger.log(response.data);
    return response.data;
  }
}
