import { Injectable } from '@angular/core';
import { ApiService } from '@core/net/api.service';
import { ApiConfig } from '@core/net/api.config';


@Injectable()
export class UserService {
    private fullUrl: string;
    private baseUrl = ''; // 设置该服务API的基路径
    constructor(private apiService: ApiService, private apiConfig: ApiConfig) {
        this.fullUrl = this.apiConfig.getDomain() + this.baseUrl; // 拼接完整请求路径
    }
    /**
     * 获取登录用户信息
    */
    getUser() {
        return this.apiService.get(this.fullUrl, {});
    }
}
