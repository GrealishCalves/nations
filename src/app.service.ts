import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

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
  constructor(private httpService: HttpService) {}

  public async getNation(): Promise<Nation> {
    const response = await lastValueFrom(
      this.httpService.get<Nation>(
        'https://datausa.io/api/data?drilldowns=Nation&measures=Population',
      ),
    );
    return response.data;
  }

  public async getPopulation(obj: any): Promise<Nation> {
    const response = await lastValueFrom(
      this.httpService.post<Nation>('http://localhost:3001/population', obj),
    );
    return response.data;
  }
}
