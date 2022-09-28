import {
  AxiosFulfilledInterceptor,
  AxiosInterceptor,
} from '@narando/nest-axios-interceptor';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosRequestConfig } from 'axios';

@Injectable()
export class LoggingAxiosInterceptor extends AxiosInterceptor {
  private readonly localHttpService: HttpService;
  constructor(httpService: HttpService) {
    super(httpService);
    this.localHttpService = new HttpService();
  }

  protected requestFulfilled(): AxiosFulfilledInterceptor<AxiosRequestConfig> {
    return async (config) => {
      const { data: response } = await this.localHttpService.axiosRef.get(
        'https://api.jikan.moe/v4/anime?q=Naruto&sfw',
      );

      config.headers['Naruto'] = response.data[0].score;

      return config;
    };
  }
}
