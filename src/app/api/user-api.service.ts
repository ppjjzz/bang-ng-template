/* API服务示例 */
import { Injectable } from '@angular/core';
import { HttpService } from '@core/net/http.service';
import { BaseUrl } from '@utils/decorators/decorators';


@Injectable({
    providedIn: 'root'
})
export class UserApiService {
    @BaseUrl()
    private baseUrl: string;
    constructor(private httpService: HttpService) {}
    /**
     * 获取用户信息示例
     * @param params 请求参数
     */
    getUser(params) {
        return this.httpService.get(`${this.baseUrl}/`, params);
    }
}
