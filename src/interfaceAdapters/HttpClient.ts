import { RequestHandler } from 'express';

export interface HttpClient {
  listen(port: number, callback: () => void): void;
  on(method: HttpMethod, url: string, ...handlers: Array<RequestHandler>): void;
}

export type HttpMethod = 'get' | 'post' | 'patch' | 'put' | 'delete';

export interface HttpRequest {
  query: any;
  params: any;
  body: any;
}
