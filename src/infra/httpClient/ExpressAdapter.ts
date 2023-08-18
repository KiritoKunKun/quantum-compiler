import cors from 'cors';
import express, { Express, RequestHandler } from 'express';
import { HttpClient, HttpMethod } from '../../interfaceAdapters/HttpClient';

export default class ExpressAdapter implements HttpClient {
  private readonly app: Express;

  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.app.use(cors());
  }

  listen(port: number, callback: () => void): void {
    this.app.listen(port, callback);
  }

  on(method: HttpMethod, url: string, ...handlers: Array<RequestHandler>): void {
    this.app[method](url, ...handlers);
  }
}
