import { Injectable } from '@angular/core';

export interface ApiUrl {
  [propName: string]: string;
}

import {
  API_ROOT
} from './../core.contants';

@Injectable()
export class ApiConfig {
    public API_DOMAIN: ApiUrl;
    constructor() {
    }
    public getDomain(key: string = 'default'): string {
        return this.API_DOMAIN[key];
    }
    public load(): any  {
      this.API_DOMAIN = API_ROOT;
      return this.API_DOMAIN;
    }
}

