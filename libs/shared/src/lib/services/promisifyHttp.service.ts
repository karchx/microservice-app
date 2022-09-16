import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosRequestConfig } from 'axios';
import { map, Observable } from 'rxjs';

@Injectable()
export class PromisifyHttpService {
  constructor(private httpService: HttpService) {}

  get(url: string, config?: AxiosRequestConfig): Promise<any> {
    return this.httpService
      .get(url, config)
      .toPromise()
      .then((res) => res.data);
  }

  post<T>(
    url: string,
    body?: T | null,
    config?: AxiosRequestConfig
  ): Promise<any> {
    return this.httpService
      .post(url, body, config)
      .toPromise()
      .then((res) => res.data);
  }

  put<T>(
    url: string,
    body?: T | null,
    config?: AxiosRequestConfig
  ): Promise<any> {
    return this.httpService
      .put(url, body, config)
      .toPromise()
      .then((res) => res.data);
  }

  delete(url: string, config?: AxiosRequestConfig): Promise<any> {
    return this.httpService
      .delete(url, config)
      .toPromise()
      .then((res) => res.data);
  }
}
