/* API服务示例 */
import { Injectable } from '@angular/core';
import { ApiService } from '@core/net/api.service';

const BASE_URL = '';

@Injectable()
export class UserApiService {
    private fullUrl: string;
    constructor(private apiService: ApiService) {
        this.fullUrl = this.apiService.getDomain() + BASE_URL;
    }
    /**
     * 获取用户信息示例
     * @param params 请求参数
     */
    getUser(params) {
        return this.apiService.get(`${this.fullUrl}/`, params);
    }
}
