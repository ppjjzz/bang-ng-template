import { Injectable } from '@angular/core';
import { ApiService } from '@core/net/api.service';
import { ApiConfig } from '@core/net/api.config';

const BASE_URL = ''; // 设置该服务API的基路径

@Injectable()
export class UserService {
    private fullUrl: string;
    constructor(private apiService: ApiService, private apiConfig: ApiConfig) {
        this.fullUrl = this.apiConfig.getDomain() + BASE_URL; // 拼接完整请求路径
    }
    /**
     * 获取登录用户信息
    */
    getUser() {
        return this.apiService.get(this.fullUrl, {});
    }
}
