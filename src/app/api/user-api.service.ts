/* API服务示例 */
import { Injectable } from '@angular/core';
import { HttpService } from '@core/net/http.service';

const BASE_URL = '';

@Injectable()
export class UserApiService {
    private fullUrl: string;
    constructor(private httpService: HttpService) {
        this.fullUrl = this.httpService.getDomain() + BASE_URL;
    }
    /**
     * 获取用户信息示例
     * @param params 请求参数
     */
    getUser(params) {
        return this.httpService.get(`${this.fullUrl}/`, params);
    }
}
